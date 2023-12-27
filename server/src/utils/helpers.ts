import { SectorDocument } from "../models/sector.model";

export type SectorMappedDocument = SectorDocument & {
  children?: SectorMappedDocument[];
  depth?: number;
};

export const mapSectorData = (
  parentId: string,
  sectors?: SectorMappedDocument[],
  depth = 0
) => {
  if (!sectors || (sectors && !sectors.length)) return [];

  const result = [];
  for (const sector of sectors) {
    if (
      (!sector.depth && depth === 0) ||
      (sector.depth === depth && sector["parent"]?.toString() === parentId)
    ) {
      const b = { ...sector };
      b.children = mapSectorData(sector._id.toString(), sectors, depth + 1);
      delete b.depth;
      result.push(b);
    }
  }
  return result;
};
