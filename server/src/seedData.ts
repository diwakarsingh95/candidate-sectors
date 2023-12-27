import "dotenv/config";
import mongoose from "mongoose";
import SectorModel from "./models/sector.model";
import seedData from "./seedData.json";
import { MONGO_URI } from "./utils/constants";

async function insertSectors(
  parentId: mongoose.Types.ObjectId | null,
  sectors: any[]
) {
  for (const sector of sectors) {
    const newSector = new SectorModel({
      value: sector.value,
      label: sector.label,
      parent: parentId,
    });
    await newSector.save();

    if (sector.children && sector.children.length > 0) {
      await insertSectors(newSector._id, sector.children);
    }
  }
}

async function insertSectorsData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    await SectorModel.deleteMany({});
    console.log("Deleted existing records.");
    console.log("Inserting seed data...");
    await insertSectors(null, seedData);
    console.log("Seed data insertion complete.");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
}

insertSectorsData();
