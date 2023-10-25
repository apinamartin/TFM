from fastapi import FastAPI
import mysql.connector
# para que no aparezca el error CORS
from fastapi.middleware.cors import CORSMiddleware
# libreria para crear modelos en fastapi
from pydantic import BaseModel

app = FastAPI()

# Definir la lista de orígenes permitidos (sitios web o lista de sitios que se desee permitir)
origins = [
    "http://localhost:5173",  # Origen React
    "http://localhost:8000",
    "http://localhost:5174",   # Origen FastAPI
]

# Añadir middleware para habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Lista de orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los headers
)

################### MODELOS
class Credenciales(BaseModel):
    pw: str
class Miembro(BaseModel):
    member_name: str
    birthday: str
    zodiac: str
    descrip: str
    url: str
class Publicacion(BaseModel):
    title: str
    content: str
    url: str
    upload_time: str
class Miembro_Publicacion(BaseModel):
    id_post: int
    id_member: int

################### BBDD
def connect_ddbb():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root", # IMPORTANTE MODIFICAR Y PONER EL USUARIO Y CONTRASEÑA PROPIOS EN LOCAL
        password="root",
        database="rainbow_set"
    )
    return mydb

################### MIEMBROS
# GET -- MIEMBROS
@app.get("/api/miembros")
def get_miembros():
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM members")
    res = mycursor.fetchall()
    return res
# POST -- MIEMBROS
@app.post("/api/miembros")
def add_miembro(miembro: Miembro):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"INSERT INTO members (member_name, birthday, zodiac, descrip, url) VALUES ('{miembro.member_name}', '{miembro.birthday}', '{miembro.zodiac}', '{miembro.descrip}', '{miembro.url}')")
    mydb.commit()
# PUT -- MIEMBROS
@app.put("/api/miembros/{id_member}")
def update_miembro(id_member: int, miembro: Miembro):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"UPDATE members SET member_name = '{miembro.member_name}', birthday = '{miembro.birthday}', zodiac = '{miembro.zodiac}', descrip = '{miembro.descrip}', url = '{miembro.url}' WHERE id_member = {id_member}")
    mydb.commit()
    return {"message": f"Miembro {miembro.member_name} actualizado con éxito"}
# DELETE -- MIEMBROS
@app.delete("/api/miembros/{id_member}")
def delete_miembro(id_member: int):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"DELETE FROM members WHERE id_member = {id_member}")
    mydb.commit()
    return {"message": f"Miembro con ID {id_member} eliminado con éxito"}

################### PUBLICACIONES
# GET -- PUBLICACIONES
@app.get("/api/posts")
def get_posts():
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM posts ORDER BY upload_time DESC")
    res = mycursor.fetchall()
    return res
# POST -- PUBLICACIONES
@app.post("/api/posts")
def add_post(post: Publicacion):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"INSERT INTO posts (title, content, url, upload_time) VALUES ('{post.title}', '{post.content}', '{post.url}', '{post.upload_time}')")
    mydb.commit()
    return {"message": f"Publicación {post.title} añadida con éxito"}
# PUT -- PUBLICACIONES
@app.put("/api/posts/{id_post}")
def update_post(id_post: int, post: Publicacion):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"UPDATE posts SET title = '{post.title}', content = '{post.content}', url = '{post.url}', upload_time = '{post.upload_time}' WHERE id_post = {id_post}")
    mydb.commit()
    return {"message": f"Publicación {id_post} actualizada con éxito"}
# DELETE -- PUBLICACIONES
@app.delete("/api/posts/{id_post}")
def delete_post(id_post: int):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"DELETE FROM posts WHERE id_post = {id_post}")
    mydb.commit()
    return {"message": f"Publicación con ID {id_post} eliminada con éxito"}

################### MIEMBROS_PUBLICACIONES
# GET -- MIEMBROS_PUBLICACIONES FROM MIEMBROS
@app.get("/api/miembros_posts/miembro/{id_member}")
def get_posts_from_member(id_member: int):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * FROM posts p JOIN members_posts mp ON p.id_post = mp.id_post WHERE mp.id_member = {id_member} ORDER BY p.upload_time DESC")
    res = mycursor.fetchall()
    return res

# POST -- MIEMBROS_PUBLICACIONES
@app.post("/api/miembros_posts")
def add_miembros_posts(miembro_post: Miembro_Publicacion):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"INSERT INTO members_posts (id_post, id_member) VALUES ({miembro_post.id_post}, {miembro_post.id_member})")
    mydb.commit()
    return {"message": f"Miembro_Publicacion añadida con éxito"}
# DELETE -- MIEMBROS_PUBLICACIONES FROM MIEMBROS
@app.delete("/api/miembros_posts/miembro/{id_member}")
def delete_from_member(id_member: int):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"DELETE FROM members_posts WHERE id_member = {id_member}")
    mydb.commit()
# GET -- MIEMBROS_PUBLICACIONES FROM POSTS
@app.get("/api/miembros_posts/post/{id_post}")
def get_miembros_from_post(id_post: int):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT id_member FROM members_posts WHERE id_post = {id_post}")
    res = mycursor.fetchall()
    return res
# DELETE -- MIEMBROS_PUBLICACIONES FROM POSTS
@app.delete("/api/miembros_posts/post/{id_post}")
def delete_from_post(id_post: int):
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute(f"DELETE FROM members_posts WHERE id_post = {id_post}")
    mydb.commit()

@app.put("/api/miembros_posts/put/{id_post}")
def test( id_post: int, posts ):
    delete_from_post(id_post)
    print(posts)
    list_of_posts = posts.split(',')
    for post in list_of_posts:
        miembro_aux = Miembro_Publicacion(id_post=int(id_post), id_member=int(post[0]))
        add_miembros_posts(miembro_aux)

# Endpoint para validar las credenciales de inicio de sesión
@app.get("/api/login")
def login():
    mydb = connect_ddbb()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT pw FROM credenciales")
    res = mycursor.fetchone()
    return res