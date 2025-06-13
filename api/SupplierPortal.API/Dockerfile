#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src


RUN curl -L https://raw.githubusercontent.com/Microsoft/artifacts-credprovider/master/helpers/installcredprovider.sh | sh

ARG FEED_ACCESSTOKEN
ENV VSS_NUGET_EXTERNAL_FEED_ENDPOINTS="{\"endpointCredentials\": [{\"endpoint\":\"https://pkgs.dev.azure.com/remira/_packaging/remira/nuget/v3/index.json\", \"username\":\"docker\", \"password\":\"${FEED_ACCESSTOKEN}\"}]}"


COPY ["NuGet.config", "."]
COPY ["SupplierPortal.API/SupplierPortal.API.csproj", "SupplierPortal.API/"]
COPY ["SupplierPortal.Infrastructure/SupplierPortal.Infrastructure.csproj", "SupplierPortal.Infrastructure/"]
COPY ["SupplierPortal.Application/SupplierPortal.Application.csproj", "SupplierPortal.Application/"]
COPY ["SupplierPortal.Domain/SupplierPortal.Domain.csproj", "SupplierPortal.Domain/"]
RUN dotnet restore "SupplierPortal.API/SupplierPortal.API.csproj"
COPY . .
WORKDIR "/src/SupplierPortal.API"
RUN dotnet build "SupplierPortal.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SupplierPortal.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Remira.UCP.SupplierPortal.API.dll"]