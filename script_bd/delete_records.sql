DO $$ DECLARE

     r RECORD;

BEGIN

    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP

        EXECUTE 'TRUNCATE ' || quote_ident(r.tablename) || ' CASCADE';

    END LOOP;

END $$;

DO $$ DECLARE

    r RECORD;

BEGIN

    FOR r IN (SELECT sequencename FROM pg_sequences WHERE schemaname = current_schema()) LOOP

        EXECUTE 'ALTER SEQUENCE ' || quote_ident(r.sequencename) || ' RESTART WITH 1';

    END LOOP;

END $$;