SELECT 'CREATE DATABASE zensho '
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'zensho')\gexec