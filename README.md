# Agence Test


## Requerimientos
     docker

## Instalación

1. Clonar proyecto
```
    $ git clone https://github.com/Nitri0/AgenceTest.git
```

2. Entrar a la carpeta del proyecto
```
    $ cd AgenceTest
```

3. Construir la imagen de doker
```
    $ docker build -t <tu usuario>/agence-test .
```

4. Correr la imagen de doker
```
    $ docker run -p 3000:3000 -d <tu usuario>/agence-test
```


## Acceso

   ```
    localhost:3000
   ``` 