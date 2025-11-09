import prisma from "../../infrastructure/db/prismaClient";

export const RouteRepository = {
    getAll: async () => {
        return prisma.route.findMany();
    },

    setBaseline: async (routeId: string) => {
        await prisma.route.updateMany({ data: { isBaseline: false } });
        return prisma.route.update({
            where: { routeId },
            data: { isBaseline: true },
        });
    },

    getComparison: async () => {
        const baseline = await prisma.route.findFirst({ where: { isBaseline: true } });
        const others = await prisma.route.findMany({ where: { isBaseline: false } });
        if (!baseline) return [];

        return others.map((r) => ({
            routeId: r.routeId,
            ghgIntensity: r.ghgIntensity,
            baseline: baseline.ghgIntensity,
            percentDiff: ((r.ghgIntensity / baseline.ghgIntensity) - 1) * 100,
            compliant: r.ghgIntensity < baseline.ghgIntensity,
        }));
    },
};
