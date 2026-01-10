FROM nginx:latest

COPY default.conf.template /etc/nginx/templates/default.conf.template

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]