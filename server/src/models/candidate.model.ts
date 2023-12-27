import mongoose from "mongoose";

export interface CandidateDocument {
  name: string;
  sectors: mongoose.Types.ObjectId[];
  agreedToTerms: boolean;
}

const candidateSchema = new mongoose.Schema<CandidateDocument>({
  name: {
    type: String,
    required: true,
  },
  sectors: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sector" }],
    required: [true, "At least one sector must be selected."],
    validate: {
      validator: (sectors: mongoose.Types.ObjectId[]) => sectors.length > 0,
      message: "At least one sector must be selected.",
    },
  },
  agreedToTerms: {
    type: Boolean,
    required: true,
  },
});

const CandidateModel = mongoose.model<CandidateDocument>(
  "Candidate",
  candidateSchema
);

export default CandidateModel;
