import prisma from "../../infrastructure/db/prismaClient";

export const PoolingService = {
    /**
     * Creates a pool for a given year and adjusts CBs among members
     */
    createPool: async (year: number, members: string[]) => {
        // Fetch CBs of all ships
        const compliances = await prisma.shipCompliance.findMany({
            where: { shipId: { in: members }, year },
        });

        if (compliances.length !== members.length) {
            throw new Error("Some ships have no compliance record for this year");
        }

        const totalCB = compliances.reduce((sum, c) => sum + c.cbGco2eq, 0);

        if (totalCB < 0) {
            throw new Error("Total CB must be >= 0 to create a valid pool");
        }

        // Sort members: surpluses first (desc), deficits last (asc)
        const sorted = compliances.sort((a, b) => b.cbGco2eq - a.cbGco2eq);

        // Redistribute credits greedily
        let surplus = 0;
        for (const ship of sorted) {
            if (ship.cbGco2eq > 0) surplus += ship.cbGco2eq;
        }

        const pool = await prisma.pool.create({
            data: { year },
        });

        const poolMembers = [];

        for (const ship of sorted) {
            let cbAfter = ship.cbGco2eq;

            if (ship.cbGco2eq < 0 && surplus > 0) {
                const transfer = Math.min(surplus, Math.abs(ship.cbGco2eq));
                cbAfter += transfer;
                surplus -= transfer;
            }

            poolMembers.push({
                poolId: pool.id,
                shipId: ship.shipId,
                cbBefore: ship.cbGco2eq,
                cbAfter,
            });

            // Update ship CB in DB
            await prisma.shipCompliance.update({
                where: { shipId_year: { shipId: ship.shipId, year } },
                data: { cbGco2eq: cbAfter },
            });
        }

        await prisma.poolMember.createMany({
            data: poolMembers,
        });

        return {
            poolId: pool.id,
            totalCB,
            members: poolMembers,
        };
    },

    /**
     * Fetch all adjusted CBs for a given year
     */
    getAdjustedCBs: async (year: number) => {
        return prisma.poolMember.findMany({
            where: { Pool: { year } },
            include: { Pool: true },
        });
    },
};