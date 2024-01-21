# Pre-Instalación
## Lambda

Seleccionas runtime (node js). Va a tener una función en código de javascript.

Enlace: [Funciones - Lambda (amazon.com)](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions)


<details>
  <summary>- Instalación</summary>

  <p>
      Crear función lambda

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/6934ce2c-7cfd-4316-99df-8bc60913c0af)


  </p>
  
  <p>
      Función lambda creada

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/b1b868b4-05fe-4808-936d-da58ed3e2ed8)

  </p>
</details>
    


### Desencadenador

Trigger para lanzar evento que tendrá la lambda. Servicio integrado con múltiples recursos.

### Permisos

Se deben agregar permisos al rol creado de la lambda function

<details>
  <summary>- Configuración</summary>

  <p>
      Rol de ejecución

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/a41b2aa6-1a88-4ebd-82b6-01d9c636b2a7)

  </p>
  
  <p>
      Crear política -> servicio DynamoDB -> permisos putitem deleteitem, etc.

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/5b68bcf9-7983-4dc1-900c-f7503ef572a2)


  </p>

  <p>
      Agregar ARN(s) -> región de recursos, nombre de tabla

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/1b3fbca4-0501-4e51-beb7-9b6c9d529940)


  </p>

  <p>
      Revisar y dar nombre a la política

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/957fe56f-a32c-44bf-b47a-806dc8e65c75)


  </p>

  El JSON final inicial puede quedar de la sig forma:

    {
    	"Version": "2012-10-17",
    	"Statement": [
    		{
    			"Sid": "VisualEditor0",
    			"Effect": "Allow",
    			"Action": [
    				"dynamodb:PutItem",
    				"dynamodb:GetItem",
    				"dynamodb:UpdateItem",
    				"dynamodb:DeleteItem",
    				"dynamodb:Scan",
    				"dynamodb:Query"
    			],
    			"Resource": [
    				"arn:aws:dynamodb:us-east-1:767397985936:table/users",
    				"arn:aws:dynamodb:us-east-1:767397985936:table/users/index/username-index"
    			]
    		}
    	]
    }

</details>    


## API Gateway

https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1#/apis

Crear API Rest, darán URL para utilizar métodos CRUD. Se debe elegir HTTP API, es la nueva versión más barata de AWS

<details>
  <summary>- Instalación</summary>  
  <p>
      Función lambda creada

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/b1b868b4-05fe-4808-936d-da58ed3e2ed8)

  </p>
</details>
    
<details>
  <summary>- Configuración</summary>  
  <p>
      Se debe integrar con la función lambda que creamos

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/b377ba6d-4e12-40d2-a4d8-5622d23c4932)

  </p>

  <p>
      Se configura la ruta de invocación y qué lambda va a invocar

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/65110ac5-d737-4551-a2fa-b54b51f63042)

  </p>

  <p>
      Se finaliza configuración

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/94de5fd6-0575-4602-b26b-45ed7bf95c1a)

  </p>
  
</details>

<details>
  <summary>- Dashboard</summary>  
  <p>
      Se muestran las rutas del API Gateway

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/9f7d4e3c-b168-4d82-afde-66ee4a004246)

  </p>
</details>

<details>
  <summary>- Prueba</summary>  
  <p>
      Se puede probar el recurso con la URL y la ruta de AWS

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/4f88a006-0956-4f64-99aa-d252e7544477)

  </p>
</details>

## DynamoDB

[Servicio | Amazon DynamoDB Management Console | DynamoDB | us-east-1](https://us-east-1.console.aws.amazon.com/dynamodbv2/home?region=us-east-1#service)

Base de datos no relacional (No SQL) sin esquema rígido y flexible.

<details>
  <summary>- Instalación</summary>  
  <p>
      Crear tabla

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/dd2ffd44-9a50-48af-971f-d9e0dc905123)


  </p>

  <p>
      agregar “id” como partition key

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/4f3ed88c-8dd5-4dcd-a3da-ae4bee7f0837)


  </p>

  <p>
      Tabla final users

  ![image](https://github.com/elJamesSnz/web-backend/assets/72090281/29317b39-7429-4325-8784-491b01fdb8d6)


  </p>
</details>

# Instalación 

1. Clonar proyecto
2. npm i 
3. Generar archivo .zip con todos los archivos y carpeta node_modules
4. Cargar en servicio lambda -> función "cargar desde" -> archivo zip

Debe quedar de la siguiente forma:

![image](https://github.com/elJamesSnz/web-backend/assets/72090281/4096a1c8-094f-4b30-b47c-ef7e575d41ef)

