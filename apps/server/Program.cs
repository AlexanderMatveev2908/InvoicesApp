using DotNetEnv;
using InvoicesApp.LibNS;
using InvoicesApp.ConfigNS.RedisNS;
using InvoicesApp.ConfigNS;
using InvoicesApp.ConfigNS.CloudNS;


Env.Load();
EnvVarsLib.CheckEnvVars();

var builder = WebApplication.CreateBuilder(args);
SettingsConf.ConfigureBuilder(builder);

await RedisConf.Connect();
await CloudConf.Connect();

var app = builder.Build();
await SettingsConf.ConfigureApp(app);

app.Run();

