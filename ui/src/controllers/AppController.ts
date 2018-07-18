import Vue from 'vue'
import VueRouter from 'vue-router'
import Component from 'vue-class-component'
import template from '../views/app/app.html'
import Routes from '../config/Routes'
import DotvueApp from '../dotvue/DotvueApp'

// vendor css
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
// app css
import '../styles/main.css'

// Register the router hooks with thier names for components
Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteUpdate',
    'beforeRouteLeave'
])

declare const System: any;

Vue.use(VueRouter)

export default function newApp(initialPath?: string): DotvueApp {
    let router = new VueRouter({
        mode: 'history',
        routes: Routes,
        scrollBehavior(to, from, savedPosition) {
            return new Promise((resolve, reject) => {
                return setTimeout(() => {
                    if (savedPosition) {
                        resolve(savedPosition)
                    } else {
                        resolve({ x: 0, y: 0 })
                    }
                }, 200)
            })
        }
    })
    if (initialPath)
        router.push(initialPath)

    return new DotvueApp(router, template)
}
