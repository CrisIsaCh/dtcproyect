var express=require('express');var express =require('express');
var mysql = require('mysql');
var cors = require('cors');
var app =express();
app.use(express.json());
app.use(cors());

var conexion =mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'dtc'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("¡Conexion Exitosa a base de Datos!");
    }
});

app.get('/',function(req,res){
    res.send('Ruta INICIO');
});

app.get('/api/mostrar',(req,res)=>{
    conexion.query('SELECT a.id,a.diaCarga,a.diaAtencion,u.apellidou,u.nombreu,m.motivo,a.motivoConsulta2,a.motivoConsulta3,a.motivoConsulta4,p.apellidop,p.nombrep,s.descripcion,a.observaciones FROM atenciones a INNER JOIN profesional p on (a.idprofesional= p.id) INNER JOIN motivoconsulta m ON(a.idmotivo = m.id) INNER JOIN usuario u on( a.idusuario=u.id) INNER JOIN searticulo s on (a.idsearticulo=s.id) ORDER BY id ASC',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);

        }
    })

});
app.get('/api/atenciones',(req,res)=>{
    conexion.query('SELECT * FROM atenciones',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);

        }
    })

});

app.get('/api/atenciones/:id',(req,res)=>{
    conexion.query('SELECT * FROM atenciones WHERE id =?',[req.params.id],(error,fila)=>{
        if(error){
           throw error;
        }else{
            res.send(fila);
           // res.send(fila[0].descripcion)

        }
    });

});

app.post('/api/atenciones/',(req,res)=>{
    let data ={
        diaCarga:req.body.diaCarga,
        diaAtencion:req.body.diaAtencion,
        idusuario:req.body.idusuario,
        idmotivo:req.body.idmotivo,
        motivoConsulta2:req.body.motivoConsulta2,
        motivoConsulta3:req.body.motivoConsulta3,
        motivoConsulta4:req.body.motivoConsulta4,
        idprofesional:req.body.idprofesional,
        idsearticulo:req.body.idsearticulo,
        observaciones:req.body.observaciones
    };
    let sql = "INSERT INTO atenciones SET ?";
    conexion.query(sql,data,function(error,result){
        if(error){
            throw error;
         }else{
             Object.assign(data,{id:result.insertId})
             res.send(data);
             
 
         }

    });

});

app.put('/api/atenciones/:id',(req,res)=>{
    let id= req.params.id;
    let diaCarga= req.body.diaCarga;
    let diaAtencion=req.body.diaAtencion;
    let idusuario=req.body.idusuario;
    let idmotivo=req.body.idmotivo;
    let motivoConsulta2=req.body.motivoConsulta2;
    let motivoConsulta3=req.body.motivoConsulta3;
    let motivoConsulta4=req.body.motivoConsulta4;
    let idprofesional=req.body.idprofesional;
    let idsearticulo=req.body.idsearticulo;
    let observaciones= req.body.observaciones;
    let sql="UPDATE atenciones SET diaCarga = ?,diaAtencion = ?,idusuario = ?,idmotivo =?,motivoConsulta2 =?,motivoConsulta3 =?,motivoConsulta4 =?,idprofesional =?,idsearticulo =?,observaciones =?  WHERE id= ?";
    
    conexion.query(sql,[diaCarga, diaAtencion, idusuario, idmotivo, motivoConsulta2, motivoConsulta3, motivoConsulta4, idprofesional,idsearticulo, observaciones,id], function(error,results){
        if(error){
            throw error;
         }else{
             res.send(results);
             
 
         }
    });
});

app.delete('/api/atenciones/:id',(req,res)=>{
    conexion.query('DELETE FROM atenciones WHERE id =?',[req.params.id],function(error,filas){
        if(error){
            throw error;
         }else{
             res.send(filas);
             
 
         }
    });
});

///////////////////////USUARIO/////////////////////////////////////////////
//lISTAR USUARIOS
app.get('/api/usuario',(req,res)=>{
    conexion.query('SELECT  *  FROM usuario',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);
            

        }
    })

});

app.get('/api/usuario/:id',(req,res)=>{
    conexion.query('SELECT * FROM usuario WHERE id =?',[req.params.id],(error,fila)=>{
        if(error){
           throw error;
        }else{
            res.send(fila);
           // res.send(fila[0].descripcion)

        }
    });

});


app.post('/api/usuario/',(req,res)=>{
    let data ={
        nombreu:req.body.nombreu,
        apellidou:req.body.apellidou,        
        direccionu:req.body.direccionu,        
    };
    let sql = "INSERT INTO usuario SET ?";
    conexion.query(sql,data,function(error,result){
        if(error){
            throw error;
         }else{
             Object.assign(data,{id:result.insertId})
             res.send(data);
             
 
         }

    });

})

app.put('/api/usuario/:id',(req,res)=>{
    let id= req.params.id;
    let nombreu= req.body.nombreu;
    let apellidou=req.body.apellidou;
    let direccionu=req.body.direccionu;    
    let sql="UPDATE usuario SET nombreu = ?,apellidou = ?,direccionu = ?  WHERE id= ?";
    
    conexion.query(sql,[nombreu, apellidou, direccionu,id], function(error,results){
        if(error){
            throw error;
         }else{
             res.send(results);
             
 
         }
    });
});

app.delete('/api/usuario/:id',(req,res)=>{
    conexion.query('DELETE FROM usuario WHERE id =?',[req.params.id],function(error,filas){
        if(error){
            throw error;
         }else{
             res.send(filas);
             
 
         }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////PROFESIONALES///////////////////////////////////////////////
//LISTAR PROFESIONALES
app.get('/api/profesionales',(req,res)=>{
    conexion.query('SELECT  * FROM profesional',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);
            

        }
    });

});

app.get('/api/profesionales/:id',(req,res)=>{
    conexion.query('SELECT * FROM  profesional WHERE id =?',[req.params.id],(error,fila)=>{
        if(error){
           throw error;
        }else{
            res.send(fila);
           // res.send(fila[0].descripcion)

        }
    });

});


app.post('/api/profesionales/',(req,res)=>{
    let data ={
        nombrep:req.body.nombrep,
        apellidop:req.body.apellidop,        
        categoriap:req.body.categoriap,        
    };
    let sql = "INSERT INTO profesional SET ?";
    conexion.query(sql,data,function(error,result){
        if(error){
            throw error;
         }else{
             Object.assign(data,{id:result.insertId})
             res.send(data);
             
 
         }

    });

})

app.put('/api/profesionales/:id',(req,res)=>{
    let id= req.params.id;
    let nombrep= req.body.nombrep;
    let apellidop=req.body.apellidop;
    let categoriap=req.body.categoriap;    
    let sql="UPDATE profesional SET nombrep = ?,apellidop = ?,categoriap = ?  WHERE id= ?";
    
    conexion.query(sql,[nombrep, apellidop, categoriap,id], function(error,results){
        if(error){
            throw error;
         }else{
             res.send(results);
             
 
         }
    });
});

app.delete('/api/profesionales/:id',(req,res)=>{
    conexion.query('DELETE FROM profesional WHERE id =?',[req.params.id],function(error,filas){
        if(error){
            throw error;
         }else{
             res.send(filas);
             
 
         }
    });
});


/////////////////////////////////////////////////////////////////////////////////////////////////////

//listar motivo consulta

app.get('/api/motivo',(req,res)=>{
    conexion.query('SELECT  id,motivo FROM motivoconsulta',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);
            

        }
    })

});


//listar se Articulo

app.get('/api/searticulo',(req,res)=>{
    conexion.query('SELECT  id,descripcion  FROM searticulo',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);
            

        }
    });

});


const port= process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Servidor Ok en puerto:"+ port);
});
