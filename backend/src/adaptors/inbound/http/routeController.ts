import { Request, Response } from "express";
import { RouteRepository } from "../../outbound/routeRepositoryImpl";

export const getAllRoutes = async (req: Request, res: Response) => {
    const routes = await RouteRepository.getAll();
    res.json(routes);
};

export const setBaseline = async (req: Request, res: Response) => {
    const { id } = req.params;
    const route = await RouteRepository.setBaseline(id);
    res.json({ message: "Baseline set successfully", route });
};

export const getComparison = async (req: Request, res: Response) => {
    const comparison = await RouteRepository.getComparison();
    res.json(comparison);
};
