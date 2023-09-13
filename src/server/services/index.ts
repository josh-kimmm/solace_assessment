import AppDataSource from "../db/data-source";
import NoteRepo from "./NoteService";

const connectDb = async () => {
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

const NoteService = async () => {
  await connectDb();

  return NoteRepo;
};




export { NoteService };