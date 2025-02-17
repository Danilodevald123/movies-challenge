# Manual Test Cases

Este documento contiene los casos de prueba manuales para la aplicación Movies Challenge. Cada sección representa un módulo diferente de la aplicación y contiene casos de prueba específicos que deben ser ejecutados manualmente para garantizar la calidad del software.

## 1. Autenticación y Autorización

### 1.1 Registro de Usuario
| ID | Caso de Prueba | Pasos | Resultado Esperado | Estado |
|----|---------------|-------|-------------------|---------|
| R1 | Registro exitoso | 1. Acceder a la ruta de registro<br>2. Ingresar email válido<br>3. Ingresar contraseña válida<br>4. Enviar formulario | - Usuario creado en BD<br>- Mensaje de éxito<br>- Redirección a login | ⬜ |
| R2 | Email inválido | 1. Acceder a la ruta de registro<br>2. Ingresar email inválido<br>3. Ingresar contraseña válida | - Mensaje de error de formato<br>- No permite envío | ⬜ |
| R3 | Email duplicado | 1. Intentar registrar un email ya existente | - Mensaje de error apropiado<br>- No se crea el usuario | ⬜ |
| R4 | Contraseña débil | 1. Ingresar email válido<br>2. Ingresar contraseña débil | - Mensaje de requisitos de contraseña<br>- No permite envío | ⬜ |

### 1.2 Login
| ID | Caso de Prueba | Pasos | Resultado Esperado | Estado |
|----|---------------|-------|-------------------|---------|
| L1 | Login exitoso | 1. Ingresar credenciales válidas<br>2. Enviar formulario | - Token JWT generado<br>- Redirección a dashboard | ⬜ |
| L2 | Credenciales inválidas | 1. Ingresar credenciales incorrectas | - Mensaje de error apropiado<br>- No permite acceso | ⬜ |
| L3 | Token expirado | 1. Usar un token JWT expirado | - Redirección a login<br>- Mensaje de sesión expirada | ⬜ |

## 2. Gestión de Películas

### 2.1 Sincronización con API Star Wars
| ID | Caso de Prueba | Pasos | Resultado Esperado | Estado |
|----|---------------|-------|-------------------|---------|
| S1 | Sincronización como admin | 1. Login como admin<br>2. Ejecutar sincronización | - Películas actualizadas<br>- Mensaje de éxito | ⬜ |
| S2 | Error de API externa | 1. Desconectar internet<br>2. Intentar sincronizar | - Mensaje de error claro<br>- No pérdida de datos existentes | ⬜ |
| S3 | Sincronización como usuario | 1. Login como usuario regular<br>2. Intentar sincronizar | - Error 403<br>- Mensaje de permisos | ⬜ |

### 2.2 Operaciones CRUD
| ID | Caso de Prueba | Pasos | Resultado Esperado | Estado |
|----|---------------|-------|-------------------|---------|
| M1 | Listar películas | 1. Acceder a lista de películas | - Mostrar todas las películas<br>- Paginación funcional | ⬜ |
| M2 | Ver detalle | 1. Seleccionar una película | - Mostrar detalles completos<br>- Datos correctos | ⬜ |
| M3 | Editar película (admin) | 1. Login como admin<br>2. Editar película | - Cambios guardados<br>- Validaciones correctas | ⬜ |
| M4 | Eliminar película (admin) | 1. Login como admin<br>2. Eliminar película | - Película eliminada<br>- Confirmación requerida | ⬜ |

## 3. Gestión de Usuarios

### 3.1 Administración de Perfiles
| ID | Caso de Prueba | Pasos | Resultado Esperado | Estado |
|----|---------------|-------|-------------------|---------|
| U1 | Actualizar perfil | 1. Acceder a perfil<br>2. Modificar datos<br>3. Guardar | - Datos actualizados<br>- Validaciones correctas | ⬜ |
| U2 | Cambiar contraseña | 1. Acceder a cambio de contraseña<br>2. Ingresar datos | - Contraseña actualizada<br>- Validaciones de seguridad | ⬜ |
| U3 | Ver perfil | 1. Acceder a perfil propio | - Datos correctos mostrados<br>- No datos sensibles visibles | ⬜ |

### 3.2 Roles y Permisos
| ID | Caso de Prueba | Pasos | Resultado Esperado | Estado |
|----|---------------|-------|-------------------|---------|
| P1 | Acceso admin | 1. Login como admin<br>2. Acceder a rutas admin | - Acceso permitido<br>- Funcionalidades admin visibles | ⬜ |
| P2 | Acceso usuario | 1. Login como usuario<br>2. Intentar acceder a rutas admin | - Acceso denegado<br>- Mensaje apropiado | ⬜ |

## 4. Manejo de Errores y Casos Límite

### 4.1 Errores de Red
| ID | Caso de Prueba | Pasos | Resultado Esperado | Estado |
|----|---------------|-------|-------------------|---------|
| E1 | Pérdida de conexión | 1. Desconectar internet<br>2. Realizar operaciones | - Mensaje de error claro<br>- No pérdida de datos | ⬜ |
| E2 | Reconexión | 1. Reconectar internet<br>2. Continuar operaciones | - Recuperación correcta<br>- Continuidad de operación | ⬜ |

### 4.2 Validaciones de Entrada
| ID | Caso de Prueba | Pasos | Resultado Esperado | Estado |
|----|---------------|-------|-------------------|---------|
| V1 | Campos requeridos | 1. Dejar campos vacíos<br>2. Intentar enviar | - Mensajes de validación<br>- No envío de formulario | ⬜ |
| V2 | Inyección SQL | 1. Intentar inyección SQL en campos | - Sanitización correcta<br>- No vulnerabilidades | ⬜ |
| V3 | XSS | 1. Intentar inyectar scripts | - Sanitización correcta<br>- No ejecución de scripts | ⬜ |

## Instrucciones de Uso

1. Para cada caso de prueba, marcar el estado como:
   - ⬜ No probado
   - ✅ Pasó
   - ❌ Falló

2. En caso de fallo:
   - Documentar el comportamiento observado
   - Crear un issue en el repositorio
   - Incluir pasos para reproducir el error
   - Adjuntar capturas de pantalla si es relevante

3. Frecuencia de pruebas:
   - Ejecutar todas las pruebas antes de cada release
   - Ejecutar pruebas relevantes después de cambios significativos
   - Mantener registro de resultados y fechas de ejecución

## Registro de Ejecución

| Fecha | Ejecutor | Casos Ejecutados | Casos Pasados | Casos Fallados | Observaciones |
|-------|----------|------------------|---------------|----------------|---------------|
|       |          |                  |               |                |               |
