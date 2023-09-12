import { MigrationInterface, QueryRunner } from "typeorm"


/*
    Originaly was thinking about using triggers and ts_vectors for better search capabilities
    but had to think twice on it and decided to implement our search by using like/ilike queries
    and indexing the contents column instead. This migration could still be potentially useful
    if we ever wanted to create more advanced searches that spans multiple words. 
*/
export class AddTriggersForTextSearch1694167035455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.startTransaction();
        
        // try {
        //     await queryRunner.query(`
        //         CREATE TRIGGER search_vector_update_contents
        //         BEFORE INSERT OR UPDATE
        //         ON note
        //         FOR EACH ROW
        //         EXECUTE FUNCTION tsvector_update_trigger(search_vector, 'pg_catalog.english', title, contents);
        //     `);
        // } catch (err) {
        //     console.log(`Migration failed with error: ${err}`);
        //     await queryRunner.rollbackTransaction();    
        // }
        

        // await queryRunner.commitTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.startTransaction();
        
        // try {
        //     await queryRunner.query(`
        //         DROP TRIGGER search_vector_update ON note
        //     `);
            
        // } catch (err) {
        //     console.error(`Revert failed with: ${err}`);
        //     await queryRunner.rollbackTransaction();
        // }

        // await queryRunner.commitTransaction();
    
    }

}
