# Базовий образ .NET для запуску API
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Образ .NET SDK для збирання проєкту
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY BackendShop.csproj .
RUN dotnet restore "BackendShop.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet publish "BackendShop.csproj" -c Release -o /app/publish


# Кінцевий контейнер для запуску API
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "BackendShop.dll"]
