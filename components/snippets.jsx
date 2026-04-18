/* Rust Web TCG — hello-world code snippets per crate */

const SNIPPETS = {
  'Leptos': {
    lang: 'rust',
    title: 'src/main.rs',
    code:
`use leptos::*;

#[component]
fn App() -> impl IntoView {
    let (count, set_count) = create_signal(0);
    view! {
        <button on:click=move |_| set_count.update(|n| *n += 1)>
            "Clicked " {count} " times"
        </button>
    }
}

fn main() { mount_to_body(App) }`
  },
  'Dioxus': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use dioxus::prelude::*;

fn App() -> Element {
    let mut count = use_signal(|| 0);
    rsx! {
        button { onclick: move |_| count += 1, "Clicked {count} times" }
    }
}

fn main() { dioxus::launch(App); }`
  },
  'Yew': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use yew::prelude::*;

#[function_component]
fn App() -> Html {
    let count = use_state(|| 0);
    let onclick = { let count = count.clone();
        Callback::from(move |_| count.set(*count + 1)) };
    html! { <button {onclick}>{ format!("Clicked {} times", *count) }</button> }
}

fn main() { yew::Renderer::<App>::new().render(); }`
  },
  'Sycamore': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use sycamore::prelude::*;

fn main() {
    sycamore::render(|cx| {
        let count = create_signal(cx, 0);
        view! { cx,
            button(on:click=move |_| count.set(*count.get() + 1)) {
                "Clicked " (count.get()) " times"
            }
        }
    });
}`
  },
  'Axum': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use axum::{routing::get, Router};

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "hello, world!" }));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}`
  },
  'Actix Web': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use actix_web::{get, App, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder { "hello, world!" }

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(hello))
        .bind(("0.0.0.0", 3000))?.run().await
}`
  },
  'Rocket': {
    lang: 'rust', title: 'src/main.rs',
    code:
`#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str { "hello, world!" }

#[launch]
fn rocket() -> _ { rocket::build().mount("/", routes![index]) }`
  },
  'Warp': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use warp::Filter;

#[tokio::main]
async fn main() {
    let hello = warp::path::end().map(|| "hello, world!");
    warp::serve(hello).run(([0, 0, 0, 0], 3000)).await;
}`
  },
  'Poem': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use poem::{get, handler, listener::TcpListener, Route, Server};

#[handler] fn hello() -> &'static str { "hello, world!" }

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let app = Route::new().at("/", get(hello));
    Server::new(TcpListener::bind("0.0.0.0:3000")).run(app).await
}`
  },
  'Loco': {
    lang: 'bash', title: 'shell',
    code:
`# Scaffold a full MVC app — models, controllers, migrations, workers
$ cargo install loco-cli
$ loco new -n blog
$ cd blog
$ cargo loco generate scaffold post title:string body:text
$ cargo loco start`
  },
  'Perseus': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use perseus::prelude::*;
use sycamore::prelude::*;

#[perseus::main(perseus_warp::dflt_server)]
pub fn main<G: Html>() -> PerseusApp<G> {
    PerseusApp::new().template(
        Template::build("index").view(|cx| view! { cx, h1 { "hello, world!" } })
    )
}`
  },
  'Tokio': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    let (a, b) = tokio::join!(work("A"), work("B"));
    println!("done: {a} / {b}");
}

async fn work(name: &str) -> &str {
    sleep(Duration::from_millis(100)).await;
    name
}`
  },
  'async-std': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use async_std::task;

#[async_std::main]
async fn main() {
    task::spawn(async { println!("hello from a task") }).await;
}`
  },
  'smol': {
    lang: 'rust', title: 'src/main.rs',
    code:
`fn main() {
    smol::block_on(async {
        let task = smol::spawn(async { 1 + 1 });
        println!("{}", task.await);
    });
}`
  },
  'SQLx': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use sqlx::postgres::PgPool;

#[tokio::main]
async fn main() -> sqlx::Result<()> {
    let pool = PgPool::connect(&std::env::var("DATABASE_URL")?).await?;
    // query! verifies this against the live DB at compile time
    let rec = sqlx::query!("SELECT name FROM users WHERE id = $1", 1i64)
        .fetch_one(&pool).await?;
    println!("hello, {}", rec.name);
    Ok(())
}`
  },
  'Diesel': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use diesel::prelude::*;
use crate::schema::users::dsl::*;

fn main() {
    let mut conn = PgConnection::establish(&std::env::var("DATABASE_URL").unwrap()).unwrap();
    let names: Vec<String> = users.select(name).limit(5).load(&mut conn).unwrap();
    for n in names { println!("hello, {n}"); }
}`
  },
  'SeaORM': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use sea_orm::*;

#[tokio::main]
async fn main() -> Result<(), DbErr> {
    let db = Database::connect("postgres://user:pass@localhost/db").await?;
    let users: Vec<user::Model> = user::Entity::find().all(&db).await?;
    for u in users { println!("hello, {}", u.name); }
    Ok(())
}`
  },
  'tonic': {
    lang: 'rust', title: 'src/server.rs',
    code:
`use tonic::{transport::Server, Request, Response, Status};
use hello::{greeter_server::{Greeter, GreeterServer}, HelloReply, HelloRequest};

#[derive(Default)] pub struct MyGreeter {}

#[tonic::async_trait]
impl Greeter for MyGreeter {
    async fn say_hello(&self, req: Request<HelloRequest>)
        -> Result<Response<HelloReply>, Status> {
        Ok(Response::new(HelloReply { message: format!("hello, {}", req.into_inner().name) }))
    }
}`
  },
  'async-graphql': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use async_graphql::*;

struct Query;

#[Object]
impl Query {
    async fn hello(&self, #[graphql(default = "world")] name: String) -> String {
        format!("hello, {name}")
    }
}

fn main() {
    let schema = Schema::new(Query, EmptyMutation, EmptySubscription);
    println!("{}", schema.sdl());
}`
  },
  'utoipa': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use utoipa::{OpenApi, ToSchema};

#[derive(ToSchema)] struct User { id: i64, name: String }

#[utoipa::path(get, path = "/users/{id}", responses(
    (status = 200, body = User)
))]
async fn get_user() {}

#[derive(OpenApi)]
#[openapi(paths(get_user), components(schemas(User)))]
struct ApiDoc;

fn main() { println!("{}", ApiDoc::openapi().to_pretty_json().unwrap()); }`
  },
  'Askama': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use askama::Template;

#[derive(Template)]
#[template(path = "hello.html")] // templates/hello.html: Hello, {{ name }}!
struct HelloTpl<'a> { name: &'a str }

fn main() {
    let html = HelloTpl { name: "world" }.render().unwrap();
    println!("{html}");
}`
  },
  'Maud': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use maud::{html, Markup};

fn page(name: &str) -> Markup {
    html! {
        h1 { "hello, " (name) "!" }
    }
}

fn main() { println!("{}", page("world").into_string()); }`
  },
  'Tera': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use tera::{Context, Tera};

fn main() {
    let tera = Tera::new("templates/**/*").unwrap();
    let mut ctx = Context::new();
    ctx.insert("name", "world");
    println!("{}", tera.render("hello.html", &ctx).unwrap());
}`
  },
  'reqwest': {
    lang: 'rust', title: 'src/main.rs',
    code:
`#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let body = reqwest::get("https://www.rust-lang.org")
        .await?
        .text()
        .await?;
    println!("{}", &body[..200]);
    Ok(())
}`
  },
  'serde': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct User { id: u64, name: String }

fn main() -> serde_json::Result<()> {
    let u = User { id: 1, name: "ferris".into() };
    let json = serde_json::to_string(&u)?;
    let back: User = serde_json::from_str(&json)?;
    println!("{json}  ->  {back:?}");
    Ok(())
}`
  },
  'hyper': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use hyper::service::service_fn;
use hyper_util::rt::TokioIo;
use http_body_util::Full;
use bytes::Bytes;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    loop {
        let (stream, _) = listener.accept().await?;
        tokio::spawn(async move {
            hyper::server::conn::http1::Builder::new()
                .serve_connection(TokioIo::new(stream), service_fn(|_req| async {
                    Ok::<_, hyper::Error>(hyper::Response::new(Full::new(Bytes::from("hello"))))
                })).await.ok();
        });
    }
}`
  },
  'tower': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use tower::{ServiceBuilder, ServiceExt, service_fn};
use std::time::Duration;

#[tokio::main]
async fn main() {
    let svc = ServiceBuilder::new()
        .timeout(Duration::from_secs(1))
        .service(service_fn(|req: &str| async move { Ok::<_, ()>(format!("hello, {req}")) }));

    let reply = svc.oneshot("world").await.unwrap();
    println!("{reply}");
}`
  },
  'tracing': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use tracing::{info, instrument};

#[instrument]
fn greet(name: &str) {
    info!(target: "app", "hello, {name}");
}

fn main() {
    tracing_subscriber::fmt().init();
    greet("world");
}`
  },
  'anyhow': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use anyhow::{Context, Result};

fn read_config() -> Result<String> {
    std::fs::read_to_string("config.toml")
        .context("while reading config.toml")
}

fn main() -> Result<()> {
    let cfg = read_config()?;
    println!("{cfg}");
    Ok(())
}`
  },
  'thiserror': {
    lang: 'rust', title: 'src/error.rs',
    code:
`use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("io: {0}")]      Io(#[from] std::io::Error),
    #[error("not found: {0}")] NotFound(String),
}

pub fn load(name: &str) -> Result<String, AppError> {
    std::fs::read_to_string(name).map_err(Into::into)
}`
  },
  'cargo': {
    lang: 'bash', title: 'shell',
    code:
`$ cargo new hello
$ cd hello
$ cat src/main.rs
fn main() { println!("hello, world!"); }

$ cargo add serde --features derive
$ cargo build --release
$ cargo test`
  },
  'wasm-bindgen': {
    lang: 'rust', title: 'src/lib.rs',
    code:
`use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    log(&format!("hello, {name}"));
}`
  },
  'trunk': {
    lang: 'bash', title: 'shell',
    code:
`# index.html  ->  <link data-trunk rel="rust" />
$ trunk serve --open
# live reload, wasm-bindgen + wasm-opt, CSS/SCSS/Tailwind — all wired.
$ trunk build --release`
  },
  'clap': {
    lang: 'rust', title: 'src/main.rs',
    code:
`use clap::Parser;

#[derive(Parser)]
#[command(name = "hello", version, about)]
struct Cli {
    /// who to greet
    #[arg(short, long, default_value = "world")]
    name: String,
}

fn main() {
    let cli = Cli::parse();
    println!("hello, {}!", cli.name);
}`
  },
};

window.SNIPPETS = SNIPPETS;
