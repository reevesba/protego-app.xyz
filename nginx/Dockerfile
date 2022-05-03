FROM nginx:alpine

LABEL Bradley Reeves "reevesbra@outlook.com"

# Copy custom nginx config
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]