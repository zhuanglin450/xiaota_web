export function toast(message,variant="primary",title){
    this.$bvToast.toast(`${message}`,{
        title,
        variant,
        autoHideDelay:5000
    })
}