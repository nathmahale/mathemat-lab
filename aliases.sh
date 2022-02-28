alias dsize="docker history --human --format '{{.CreatedBy}}: {{.Size}}' $*"
alias dst="docker stop $*"
alias dr="docker rm $*"
alias dri="docker rmi $*"
alias ds="docker system df"
alias dsv="docker system df -v"
alias di="docker images -a"
alias dp="docker ps -a"
alias de="docker exec -it $*"
alias dlgn='docker exec -it b86 bash'
alias dlgn1='docker exec -it db8 /bin/sh'
alias dlgnr='docker exec -it -u root b86 bash'