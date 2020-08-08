



FROM mcr.microsoft.com/powershell:nanoserver-1903 AS downloadnodejs

RUN mkdir -p C:\nodejsfolder
WORKDIR C:\nodejsfolder

SHELL ["pwsh", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]

RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/latest/node-v14.7.0-win-x64.zip"

Expand-Archive nodejs.zip -DestinationPath C:\
Rename-Item "C:\node-v14.7.0-win-x64" c:\nodejs



FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-nanoserver-1903 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY --from=downloadnodejs C:\nodejs\ C:\Windows\system32\

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-nanoserver-1903 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./

RUN dotnet build "EngineeringToolsServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EngineeringToolsServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EngineeringToolsServer.dll"]
