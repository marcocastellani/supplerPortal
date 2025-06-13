# Install Template

To install the Template simply open a Console, go inside the folder and type:

 `dotnet new install .\`  

inside of visual studio the template should be visible now.

![](docs/vsselect.png)

Better yet, you can use the dotnet cli to create a new project inside your Application:

`dotnet new remira-api --SupplierPortal ProjectName --IncludeWebProject false --IncludeSolution false --IncludeApplicationUnitTests false --IncludeIntegrationTests false --IncludeDomainUnitTests false`

The Folders and all keys are automatically renamed accordingly.

# What does the Template include?

The template contains our typical Clean Architecture approach with Infrastructure, Application and Domain layer. The WebApi is not included by default inside this template, because it is not necessary for every project. If you want to enable it, add the parameter `--IncludeWebProject true` to the dotnet new command.

# What do i have to do after creating a new project?
Take a look at the following files:

`Application/Common/Mappings/ApplicationMappingProfile.cs` Enable the base class if you are using the automapper library.

`API/Program.cs` Take a look at the UCPCommon / Swagger section and enable accordingly.

`API/appsettings.development.json` Take a look at the Auth section and use the correct audience.

`Infrastructure/ConfigureServices.cs` Take a look at the ConnectionString and use accordingly.
