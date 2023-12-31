import { MigrationInterface, QueryRunner } from "typeorm"

export class AddGinIndex1694169289309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION pg_trgm;
            CREATE INDEX text_search_idx ON note USING GIN(contents gin_trgm_ops);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX text_search_idx
        `)
    
    }

}
