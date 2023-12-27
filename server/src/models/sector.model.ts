import mongoose from "mongoose";

export interface SectorDocument {
  _id: mongoose.Types.ObjectId;
  label: string;
  value: string;
  parent: mongoose.Types.ObjectId | null;
  _doc: Omit<this, "_doc">;
}

const sectorSchema = new mongoose.Schema<SectorDocument>(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sector",
      index: true,
    },
  },
  { timestamps: true }
);

const SectorModel = mongoose.model<SectorDocument>("Sector", sectorSchema);

export default SectorModel;
