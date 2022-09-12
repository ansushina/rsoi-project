FROM trion/ng-cli:latest as build

COPY . /app

RUN npm install
RUN ng build --prod

FROM nginx:1.17.4

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ridenow-taxi-admin-carrier-web-app /usr/share/nginx/html


