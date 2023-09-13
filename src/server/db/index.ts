import AppDataSource from "./data-source";


const connectDb = async () => {
  if(AppDataSource.isInitialized){
    console.log("Reusing DB instance!!!");
    return AppDataSource;
  }
  
  try {
    await AppDataSource.initialize();
  } catch(err: any) {
    console.error("Error during Data Source initialization", err)
  }

  console.log("DB has been initialized");
  return AppDataSource;
};

export { connectDb }