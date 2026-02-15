# Memory Timeline Backend

## Instalación

```bash
npm install
```

## Configurar base de datos

1. Instala PostgreSQL en tu sistema o usa un servicio como Railway/Neon
2. Configura la variable `DATABASE_URL` en el archivo `.env`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/memory_timeline?schema=public"
   ```
3. Ejecuta las migraciones:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## Ejecutar la aplicación

```bash
npm run dev
```
