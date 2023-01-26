DO $$ DECLARE

     r RECORD;

BEGIN

    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP

        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';

    END LOOP;

END $$;

DO $$ DECLARE

    r RECORD;

BEGIN

    FOR r IN (SELECT sequencename FROM pg_sequences WHERE schemaname = current_schema()) LOOP

        EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(r.sequencename) || ' CASCADE';

    END LOOP;

END $$;