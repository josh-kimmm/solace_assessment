import AppDataSource from "../data-source";
import NoteRepo from "./NoteService";

const connectDb = async () => {
  if(AppDataSource.isInitialized){
    console.log("Reusing DB instance!!!");
    return AppDataSource;
  }
  
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error("Error during Data Source initialization", error);
    throw error;
  }

  console.log("DB has been initialized");
  return AppDataSource;
};

const NoteService = async () => {
  await connectDb();

  return NoteRepo;
};




export { NoteService };