import prisma from "../../infrastructure/db/prismaClient";

export const BankingService = {
    getBankRecords: async (shipId: string, year: number) => {
        return prisma.bankEntry.findMany({ where: { shipId, year } });
    },

    bankSurplus: async (shipId: string, year: number, amount: number) => {
        const cb = await prisma.shipCompliance.findUnique({
            where: { shipId_year: { shipId, year } },
        });

        if (!cb || cb.cbGco2eq <= 0) {
            throw new Error("No positive CB available to bank");
        }

        return prisma.bankEntry.create({
            data: { shipId, year, amountGco2eq: amount },
        });
    },

    applyBanked: async (shipId: string, year: number, amount: number) => {
        const records = await prisma.bankEntry.findMany({ where: { shipId } });
        const totalBanked = records.reduce((acc, r) => acc + r.amountGco2eq, 0);

        if (amount > totalBanked) {
            throw new Error("Insufficient banked balance");
        }

        await prisma.shipCompliance.update({
            where: { shipId_year: { shipId, year } },
            data: { cbGco2eq: { increment: amount } },
        });

        return { applied: amount, remaining: totalBanked - amount };
    },
};