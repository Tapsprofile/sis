# sample

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
### How to transfer the sources to the Server.
1. Use winscp.
2. login to winscp by providing the IT User and Password.
3. AFter that Left panel will show as source and right panel as Destination
4. Point to the Right sample project from left and then drag and drop to right side under solutions.
5. Now from the Ubuntu
6. Go to the location where solutions folder is there and then go to the location samples.
Inside samples start the below docker commands. Try using different version.
### Step to run as the DOcker

### First Add the Dockerfile
After that put that file in the project location
1.  docker build -t myvue:1.0 .
2. Validate by 
	docker images
3. docker run -d -p 8086:8086 myvue:1.0
4. Validate by
	docker ps or  docker container ls | grep myvue
5. to remove the images 
	sudo docker rmi -f 49b0cd190735
	make sure to provide -f and the container ID
6. To kill the container use rmi command
	docker kill 0810b01ef284

	