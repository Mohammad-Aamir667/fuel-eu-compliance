import prisma from "../../infrastructure/db/prismaClient";

const TARGET_INTENSITY = 89.3368; // gCO₂e/MJ
const ENERGY_FACTOR = 41000; // MJ per tonne

export const ComplianceService = {
    /**
     * Calculates and stores compliance balances for all routes in a given year.
     */
    calculateCB: async (year: number) => {
        const routes = await prisma.route.findMany({ where: { year } });
        const results: any[] = [];

        for (const route of routes) {
            const energyInScope = route.fuelConsumption * ENERGY_FACTOR;
            const cb = (TARGET_INTENSITY - route.ghgIntensity) * energyInScope;

            const record = await prisma.shipCompliance.upsert({
                where: {
                    shipId_year: {
                        shipId: route.routeId,
                        year,
                    },
                },
                update: { cbGco2eq: cb },
                create: {
                    shipId: route.routeId,
                    year,
                    cbGco2eq: cb,
                },
            });

            results.push({
                routeId: route.routeId,
                cbGco2eq: cb,
            });
        }

        return results;
    },

    /**
     * Fetches all compliance balance records for a given year.
     */
    getCB: async (year: number) => {
        return prisma.shipCompliance.findMany({ where: { year } });
    },
};
