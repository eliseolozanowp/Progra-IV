Vue.component('v-select-autor', VueSelect.VueSelect);
Vue.component('componente-libros', {
    data() {
        return {
            valor:'',
            libros:[],
            autores:[],
            accion:'nuevo',
            libro:{
                autor: {
                    id:'',
                    label:''
                },
                idLibro: new Date().getTime(),
                isbn:'',
                titulo:'',
                editorial:'',
                edicion:''
            }
        }
    },
    methods:{
        buscarLibro(e){
            this.listar();
        },
        eliminarLibro(idLibro){
            if( confirm(`Esta seguro de elimina el producto?`) ){
                let store = abrirStore('libros', 'readwrite'),
                query = store.delete(idLibro);
            query.onsuccess = e=>{
                this.nuevoLibro();
                this.listar();
            };
            }
        },
        modificarLibro(libro){
            this.accion = 'modificar';
            this.libro = libro;
        },
        guardarLibro(){
            //almacenamiento del objeto libros en indexedD
            if (this.libro.autor.id=='' ||
                this.libro.autor.label=='' ) {
                    console.error("Por favor seleccione una autor");
                    return;
            }
            let store = abrirStore('libros', 'readwrite'),
                query = store.put({...this.libro});
            query.onsuccess = e=>{
                this.nuevoLibro();
                this.listar();
            };
            query.onerror = e=>{
                console.error('Error al guardar en libros', e.message());
            };
        },
        nuevoLibro(){
            this.accion = 'nuevo';
            this.libro = {
                autor:{
                    id:'',
                    label:''
                },
                idLibro: new Date().getTime(),
                isbn:'',
                titulo:'',
                editorial:'',
                edicion:''
            }
        },
        listar(){
            let storeCat = abrirStore('autores', 'readonly'),
                dataCat= storeCat.getAll();
            dataCat.onsuccess = resp=>{
                this.autores = dataCat.result.map(autor=>{
                    return {
                        id: autor.idAutor,
                        label: autor.nombre
                    }
                });
            };
            let store = abrirStore('libros', 'readonly'),
                data = store.getAll();
            data.onsuccess = resp=>{
                this.libros = data.result
                    .filter(libro=>libro.isbn.includes(this.valor) || 
                    libro.titulo.toLowerCase().includes(this.valor.toLowerCase()) || 
                    libro.editorial.toLowerCase().includes(this.valor.toLowerCase()) || 
                    libro.edicion.toLowerCase().includes(this.valor.toLowerCase()));
            };
        }
    },
    template: `
        <div class="row">
            <div class="col col-md-6">
                <div class="card">
                    <div class="card-header text-bg-dark">REGISTRO DE LIBROS</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">AUTOR</div>
                            <div class="col col-md-3">
                                <v-select-autor required v-model="libro.autor" :options="autores">Por favor seleccione un autor</v-select-autor>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">ISBN</div>
                            <div class="col col-md-3">
                                <input v-model="libro.isbn" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">TITULO</div>
                            <div class="col col-md-5">
                                <input v-model="libro.titulo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">EDITORIAL</div>
                            <div class="col col-md-5">
                                <input v-model="libro.editorial" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">EDICION</div>
                            <div class="col col-md-3">
                                <input v-model="libro.edicion" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarLibro" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoLibro" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE LIBROS</div>
                    <div class="card-body">
                        <form id="frmLibro">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="6">
                                            <input placeholder="" type="search" v-model="valor" @keyup="buscarLibro" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>AUTOR</th>
                                        <th>ISBN</th>
                                        <th>TITULO</th>
                                        <th>EDITORIAL</th>
                                        <th>EDICION</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarLibro(libro)" v-for="libro in libros" :key="libro.idLibro">
                                        <td>{{libro.autor.label}}</td>
                                        <td>{{libro.isbn}}</td>
                                        <td>{{libro.titulo}}</td>
                                        <td>{{libro.editorial}}</td>
                                        <td>{{libro.edicion}}</td>
                                        <td><button @click.prevent.default="eliminarLibro(libro.idLibro)" class="btn btn-danger">del</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
});