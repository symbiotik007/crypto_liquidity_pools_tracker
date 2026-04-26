-- ================================================================
-- DIAGNÓSTICO Y FIX NOTIFICACIONES
-- ================================================================

-- 1. Verificar que la tabla existe y tiene datos
SELECT count(*) as total FROM public.notificaciones;

-- 2. Insertar notificación de prueba para Oscar (para verificar que funciona)
INSERT INTO public.notificaciones (user_id, tipo, titulo, mensaje)
VALUES (
  'cd8a8505-ae8b-4ea0-8a0e-336c9ff023c6',
  'plan_actualizado',
  '🔔 Notificación de prueba',
  'Si ves esto, las notificaciones están funcionando correctamente.'
);

-- 3. Verificar que se insertó
SELECT id, user_id, tipo, titulo, leida, created_at
FROM public.notificaciones
ORDER BY created_at DESC
LIMIT 10;

-- 4. Fix política INSERT — asegura que admin puede insertar para cualquier usuario
DROP POLICY IF EXISTS "insert notifs" ON public.notificaciones;
CREATE POLICY "insert notifs" ON public.notificaciones FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );
