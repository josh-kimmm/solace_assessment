import { MigrationInterface, QueryRunner } from "typeorm"

export class AddGinIndex1694169289309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX text_search_idx ON note USING GIN(search_vector)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX text_search_idx
        `)
    
    }

}
