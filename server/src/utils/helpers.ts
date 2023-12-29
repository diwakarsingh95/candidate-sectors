import { sort } from "fast-sort";
import { SectorDocument } from "../models/sector.model"; 

export type SectorMappedDocument = SectorDocument & {
  children?: SectorMappedDocument[];
  depth?: number;
};

export const getMappedSectors = (
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
      b.children = getMappedSectors(sector._id.toString(), sectors, depth + 1);
      delete b.depth;
      result.push(b);
    }
  }
  return result;
};

export const getSortedSectors = (
  sectors: SectorMappedDocument[]
): SectorMappedDocument[] => {
  const result = [];
  for (const sector of sectors) {
    const sectorCopy = { ...sector };
    if (sector.children) {
      sectorCopy.children = sort(getSortedSectors(sector.children)).by([
        { desc: (s) => s.children?.length },
        { asc: (s) => s.label },
      ]);
    }
    result.push(sectorCopy);
  }
  return result;
};
