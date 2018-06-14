FROM registry.gitlab.com/hosttoday/ht-docker-node:stable
RUN yarn global add cloudly
CMD cloudly