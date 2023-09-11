import { MigrationInterface, QueryRunner } from "typeorm"

export class AddTriggersForTextSearch1694167035455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();
        
        try {
            await queryRunner.query(`
                CREATE TRIGGER search_vector_update
                BEFORE INSERT OR UPDATE
                ON note
                FOR EACH ROW
                EXECUTE FUNCTION tsvector_update_trigger(search_vector, 'pg_catalog.simple', contents);
            `);
        } catch (err) {
            console.log(`Migration failed with error: ${err}`);
            await queryRunner.rollbackTransaction();    
        }
        

        await queryRunner.commitTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();
        
        try {
            await queryRunner.query(`
                DROP TRIGGER search_vector_update ON note
            `);
            
        } catch (err) {
            console.error(`Revert failed with: ${err}`);
            await queryRunner.rollbackTransaction();
        }

        await queryRunner.commitTransaction();
    
    }

}
