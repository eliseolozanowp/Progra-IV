<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sistema de Facturacion</title>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
        <!-- Styles -->
        <link rel="stylesheet" href="	https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://unpkg.com/vue-select@3.0.0/dist/vue-select.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/AlertifyJS/1.13.1/css/alertify.min.css">
    </head>
    <body>
        <div class="container-fluid" id="app">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand">::.. SISTEMA DE FACTURACION ..::</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link" @click="abrirFormulario('categoria')">Categoria</a>
                            <a class="nav-link" @click="abrirFormulario('producto')">Productos</a>
                            <a class="nav-link" @click="abrirFormulario('cliente')">Cliente</a>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="appSistema">
                <componente-categorias ref="categoria" v-show="forms['categoria'].mostrar"></componente-categorias>
                <componente-productos ref="producto" v-show="forms['producto'].mostrar"></componente-productos>
                <componente-clientes ref="cliente" v-show="forms['cliente'].mostrar"></componente-clientes>
            </div>
        </div>
    </body>
</html>