-- =============================================================================
-- Pilaris Studio — criação do usuário e banco em um PostgreSQL instalado no
-- Windows (alternativa ao Docker). Execute conectado como superusuário:
--
--   psql -U postgres -h localhost -p 5432 -v app_password="'SUA_SENHA'" -f database/scripts/create-local-database.sql
--
-- Depois ajuste DATABASE_URL no .env:
--   postgresql://pilaris:SUA_SENHA@localhost:5432/pilaris_studio?schema=public
-- =============================================================================

CREATE ROLE pilaris WITH LOGIN PASSWORD :app_password CREATEDB;
CREATE DATABASE pilaris_studio OWNER pilaris ENCODING 'UTF8' TEMPLATE template0;
