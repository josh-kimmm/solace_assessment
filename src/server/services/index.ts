import { DataSource } from "typeorm";
import AppDataSource from "../db/data-source";
import NoteRepo, { AllNoteServices } from "./NoteService";

const connectDb = async (): Promise<DataSource> => {
  if(AppDataSource.isInitialized){
    console.log("Reusing DB instance!!!");
    return AppDataSource;
  }
  
  try {
    await AppDataSource.initialize();
  } catch(err: any) {
    console.error("Error during Data Source initialization", err);
    throw err;
  }

  console.log("DB has been initialized");
  return AppDataSource;
};

const NoteService = async (): Promise<AllNoteServices> => {
  // rethrow the error if we failed to connect to db, no need return anything
  await connectDb();

  return NoteRepo;
};




export { NoteService };