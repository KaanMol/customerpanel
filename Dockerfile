FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN useradd -ms /bin/bash devboi
RUN mkdir /app
RUN chmod -R 777 /app
RUN apt-get update
RUN apt-get install -y --no-install-recommends curl wget git icu-devtools default-jdk openssh-client
# Install Node.JS
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs
# Install latest Stripe-CLI
RUN LATEST_VERSION=`curl https://api.github.com/repos/stripe/stripe-cli/releases/latest | grep "tag_name" |  cut -d : -f 2 | tr -d '",v '` \
    && wget https://github.com/stripe/stripe-cli/releases/download/v$LATEST_VERSION/stripe_${LATEST_VERSION}_linux_x86_64.tar.gz \
    && tar -xvf stripe_*_linux_x86_64.tar.gz \
    && mv ./stripe /bin

WORKDIR /app

COPY ./package*.json ./

RUN npm install

USER devboi

