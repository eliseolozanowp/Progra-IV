<?php
include('../../Config/Config.php');
extract($_REQUEST);

$categorias = isset($categorias) ? $categorias : '[]';

class categorias{
    private $datos=[], $db, $respuesta = ['msg'=>'ok'];
    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($categorias){
        $this->datos = json_decode($categorias);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['idCategoria']) ){
            $this->respuesta['msg'] = 'Por error no se pudo seleccionar la ID';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo de la categoria';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre de la categoria';
        }
        return $this->administrar_categorias();
    }
    private function administrar_categorias(){
        global $accion;

        if( $this->respuesta['msg'] === 'ok' ){
            if( $accion==='nuevo' ){
                return $this->db->consultas('INSERT INTO categorias VALUES(?,?,?)',
                $this->datos['idCategoria'],$this->datos['codigo'],$this->datos['nombre']);
            }
        }else{
            return $this->respuesta;
        }
    }
}
?>