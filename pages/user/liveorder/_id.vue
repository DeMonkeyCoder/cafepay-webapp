<template>
  <div class="live-preorder">
    <header class="live-preorder__header">
      <div class="live-preorder__header__btn">
        <b-button tag="router-link"
          to="/user/home"
          class="float-btn shadow-lg"
          type="is-dark"
          inverted
          icon-right="home"
        />
      </div>
      <div class="live-preorder__header__info normal-radius">
        <p class="font-norm normal-radius" dir="rtl">
          سفارش فعلی: <span class="p-text font-16 font-bold">ادی برگر</span>
        </p>
      </div>
    </header>
    <section
      class="live-preorder__content"
      :class="{
        'live-preorder__content--status-0': status == 0,
        'live-preorder__content--status-1': status == 1,
        'live-preorder__content--status-2': status == 2,
        'live-preorder__content--status-3': status == 3,
      }"
    >
      <!-- سفارش ثبت شده، در انتظار تایید -->
      <div class="live-preorder__content__status status">
        <div id="animation-order-status"></div>
        <p>{{ statusText }}</p>
      </div>
      <!-- در حال آماده سازی -->
      <!-- سفارش شما حاضر -->
      <!-- سفارش تایید نشد، تماس با پشتیبانی -->
      <div
        class="live-preorder__content__orders fix-animation-gap cp-card has-background-white"
      >
      <ul dir="rtl" class="cp-padding">
        <li class="live-preorder__content_orders__order" v-for="(order, i) in table.persons[0].orders" :key="i">
          <p class="font-norm font-16">{{order.name}}</p>
          <p>{{order.count}} عدد | {{order.payment_info.total_amount | currency}}<span class="toman">تومان</span></p>
        </li>
        <li class="live-preorder__content__orders__totalAmount">
          <p class="font-18 font-bold">مجموع: {{table.payment.total_amount | currency}}<span class="toman">تومان</span></p>
        </li>
      </ul>
      </div>
    </section>
  </div>
</template>

<script>
import foodReady from '~/assets/img/food-ready.json'
import preparingFood from '~/assets/img/animations/preparing-food.json'
import declined from '~/assets/img/animations/sad-empty-box.json'
import waiting from '~/assets/img/animations/timer-1.json'

import lottie from 'lottie-web'
export default {
  data() {
    return {
      status: 0,
      foodReady,
      preparingFood,
      declined,
      waiting,
      statusText: '',
      table: {
      table_number: '3333',
      token: '3333',
      tpayment: 0,
      persons: [
        {
          totalPrice: 129000,
          totalPaid: 0,
          avatar:
            'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTgwIDE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCA2NikiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTM0LjQzNiAxMC4xODRDMTM0IDExLjAzOTcgMTM0IDEyLjE1OTggMTM0IDE0LjRWNjEuNkMxMzQgNjMuODQwMiAxMzQgNjQuOTYwMyAxMzQuNDM2IDY1LjgxNkMxMzQuODE5IDY2LjU2ODYgMTM1LjQzMSA2Ny4xODA1IDEzNi4xODQgNjcuNTY0QzEzNy4wNCA2OCAxMzguMTYgNjggMTQwLjQgNjhIMTYzLjZDMTY1Ljg0IDY4IDE2Ni45NiA2OCAxNjcuODE2IDY3LjU2NEMxNjguNTY5IDY3LjE4MDUgMTY5LjE4MSA2Ni41Njg2IDE2OS41NjQgNjUuODE2QzE3MCA2NC45NjAzIDE3MCA2My44NDAyIDE3MCA2MS42VjUyLjk5NDRDMTcxLjM1IDUyLjk3NjEgMTcyLjE2MSA1Mi44OTc5IDE3Mi44MTYgNTIuNTY0QzE3My41NjkgNTIuMTgwNSAxNzQuMTgxIDUxLjU2ODYgMTc0LjU2NCA1MC44MTZDMTc1IDQ5Ljk2MDMgMTc1IDQ4Ljg0MDIgMTc1IDQ2LjZWMjkuNEMxNzUgMjcuMTU5OCAxNzUgMjYuMDM5NyAxNzQuNTY0IDI1LjE4NEMxNzQuMTgxIDI0LjQzMTQgMTczLjU2OSAyMy44MTk1IDE3Mi44MTYgMjMuNDM2QzE3Mi4xNjEgMjMuMTAyMSAxNzEuMzUgMjMuMDIzOSAxNzAgMjMuMDA1NlYxNC40QzE3MCAxMi4xNTk4IDE3MCAxMS4wMzk3IDE2OS41NjQgMTAuMTg0QzE2OS4xODEgOS40MzEzOSAxNjguNTY5IDguODE5NDcgMTY3LjgxNiA4LjQzNTk3QzE2Ni45NiA4IDE2NS44NCA4IDE2My42IDhIMTQwLjRDMTM4LjE2IDggMTM3LjA0IDggMTM2LjE4NCA4LjQzNTk3QzEzNS40MzEgOC44MTk0NyAxMzQuODE5IDkuNDMxMzkgMTM0LjQzNiAxMC4xODRaTTIwLjQzNiAxNy4xODRDMjAgMTguMDM5NyAyMCAxOS4xNTk4IDIwIDIxLjRWMzFIMTYuNEMxNC4xNTk4IDMxIDEzLjAzOTcgMzEgMTIuMTg0IDMxLjQzNkMxMS40MzE0IDMxLjgxOTUgMTAuODE5NSAzMi40MzE0IDEwLjQzNiAzMy4xODRDMTAgMzQuMDM5NyAxMCAzNS4xNTk4IDEwIDM3LjRWNTQuNkMxMCA1Ni44NDAyIDEwIDU3Ljk2MDMgMTAuNDM2IDU4LjgxNkMxMC44MTk1IDU5LjU2ODYgMTEuNDMxNCA2MC4xODA1IDEyLjE4NCA2MC41NjRDMTMuMDM5NyA2MSAxNC4xNTk4IDYxIDE2LjQgNjFIMzkuNkM0MS44NDAyIDYxIDQyLjk2MDMgNjEgNDMuODE2IDYwLjU2NEM0NC41Njg2IDYwLjE4MDUgNDUuMTgwNSA1OS41Njg2IDQ1LjU2NCA1OC44MTZDNDYgNTcuOTYwMyA0NiA1Ni44NDAyIDQ2IDU0LjZWMzguNlYzNy40VjIxLjRDNDYgMTkuMTU5OCA0NiAxOC4wMzk3IDQ1LjU2NCAxNy4xODRDNDUuMTgwNSAxNi40MzE0IDQ0LjU2ODYgMTUuODE5NSA0My44MTYgMTUuNDM2QzQyLjk2MDMgMTUgNDEuODQwMiAxNSAzOS42IDE1SDI2LjRDMjQuMTU5OCAxNSAyMy4wMzk3IDE1IDIyLjE4NCAxNS40MzZDMjEuNDMxNCAxNS44MTk1IDIwLjgxOTUgMTYuNDMxNCAyMC40MzYgMTcuMTg0WiIgZmlsbD0iIzAwNzZERSIvPjxtYXNrIGlkPSJzaWRlc1NxdWFyZUFzc3ltZXRyaWNNYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMTAiIHk9IjgiIHdpZHRoPSIxNjUiIGhlaWdodD0iNjAiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTM0LjQzNiAxMC4xODRDMTM0IDExLjAzOTcgMTM0IDEyLjE1OTggMTM0IDE0LjRWNjEuNkMxMzQgNjMuODQwMiAxMzQgNjQuOTYwMyAxMzQuNDM2IDY1LjgxNkMxMzQuODE5IDY2LjU2ODYgMTM1LjQzMSA2Ny4xODA1IDEzNi4xODQgNjcuNTY0QzEzNy4wNCA2OCAxMzguMTYgNjggMTQwLjQgNjhIMTYzLjZDMTY1Ljg0IDY4IDE2Ni45NiA2OCAxNjcuODE2IDY3LjU2NEMxNjguNTY5IDY3LjE4MDUgMTY5LjE4MSA2Ni41Njg2IDE2OS41NjQgNjUuODE2QzE3MCA2NC45NjAzIDE3MCA2My44NDAyIDE3MCA2MS42VjUyLjk5NDRDMTcxLjM1IDUyLjk3NjEgMTcyLjE2MSA1Mi44OTc5IDE3Mi44MTYgNTIuNTY0QzE3My41NjkgNTIuMTgwNSAxNzQuMTgxIDUxLjU2ODYgMTc0LjU2NCA1MC44MTZDMTc1IDQ5Ljk2MDMgMTc1IDQ4Ljg0MDIgMTc1IDQ2LjZWMjkuNEMxNzUgMjcuMTU5OCAxNzUgMjYuMDM5NyAxNzQuNTY0IDI1LjE4NEMxNzQuMTgxIDI0LjQzMTQgMTczLjU2OSAyMy44MTk1IDE3Mi44MTYgMjMuNDM2QzE3Mi4xNjEgMjMuMTAyMSAxNzEuMzUgMjMuMDIzOSAxNzAgMjMuMDA1NlYxNC40QzE3MCAxMi4xNTk4IDE3MCAxMS4wMzk3IDE2OS41NjQgMTAuMTg0QzE2OS4xODEgOS40MzEzOSAxNjguNTY5IDguODE5NDcgMTY3LjgxNiA4LjQzNTk3QzE2Ni45NiA4IDE2NS44NCA4IDE2My42IDhIMTQwLjRDMTM4LjE2IDggMTM3LjA0IDggMTM2LjE4NCA4LjQzNTk3QzEzNS40MzEgOC44MTk0NyAxMzQuODE5IDkuNDMxMzkgMTM0LjQzNiAxMC4xODRaTTIwLjQzNiAxNy4xODRDMjAgMTguMDM5NyAyMCAxOS4xNTk4IDIwIDIxLjRWMzFIMTYuNEMxNC4xNTk4IDMxIDEzLjAzOTcgMzEgMTIuMTg0IDMxLjQzNkMxMS40MzE0IDMxLjgxOTUgMTAuODE5NSAzMi40MzE0IDEwLjQzNiAzMy4xODRDMTAgMzQuMDM5NyAxMCAzNS4xNTk4IDEwIDM3LjRWNTQuNkMxMCA1Ni44NDAyIDEwIDU3Ljk2MDMgMTAuNDM2IDU4LjgxNkMxMC44MTk1IDU5LjU2ODYgMTEuNDMxNCA2MC4xODA1IDEyLjE4NCA2MC41NjRDMTMuMDM5NyA2MSAxNC4xNTk4IDYxIDE2LjQgNjFIMzkuNkM0MS44NDAyIDYxIDQyLjk2MDMgNjEgNDMuODE2IDYwLjU2NEM0NC41Njg2IDYwLjE4MDUgNDUuMTgwNSA1OS41Njg2IDQ1LjU2NCA1OC44MTZDNDYgNTcuOTYwMyA0NiA1Ni44NDAyIDQ2IDU0LjZWMzguNlYzNy40VjIxLjRDNDYgMTkuMTU5OCA0NiAxOC4wMzk3IDQ1LjU2NCAxNy4xODRDNDUuMTgwNSAxNi40MzE0IDQ0LjU2ODYgMTUuODE5NSA0My44MTYgMTUuNDM2QzQyLjk2MDMgMTUgNDEuODQwMiAxNSAzOS42IDE1SDI2LjRDMjQuMTU5OCAxNSAyMy4wMzk3IDE1IDIyLjE4NCAxNS40MzZDMjEuNDMxNCAxNS44MTk1IDIwLjgxOTUgMTYuNDMxNCAyMC40MzYgMTcuMTg0WiIgZmlsbD0id2hpdGUiLz48L21hc2s+PGcgbWFzaz0idXJsKCNzaWRlc1NxdWFyZUFzc3ltZXRyaWNNYXNrMCkiPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iNzYiIGZpbGw9IiNGRkE3MjYiLz48cmVjdCB5PSI0NyIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyOSIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNjEgMjVDMTYzLjc2MSAyNSAxNjYgMjIuNzYxNCAxNjYgMjBDMTY2IDE3LjIzODYgMTYzLjc2MSAxNSAxNjEgMTVDMTU4LjIzOSAxNSAxNTYgMTcuMjM4NiAxNTYgMjBDMTU2IDIyLjc2MTQgMTU4LjIzOSAyNSAxNjEgMjVaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2MSA0MUMxNjMuNzYxIDQxIDE2NiAzOC43NjE0IDE2NiAzNkMxNjYgMzMuMjM4NiAxNjMuNzYxIDMxIDE2MSAzMUMxNTguMjM5IDMxIDE1NiAzMy4yMzg2IDE1NiAzNkMxNTYgMzguNzYxNCAxNTguMjM5IDQxIDE2MSA0MVoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDEsIDApIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUwIDhMODIgNTJIMThMNTAgOFoiIGZpbGw9IiNFMUU2RTgiLz48bWFzayBpZD0idG9wUHlyYW1pZE1hc2swIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIxOCIgeT0iOCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ0Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUwIDhMODIgNTJIMThMNTAgOFoiIGZpbGw9IndoaXRlIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjdG9wUHlyYW1pZE1hc2swKSI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSI1MiIgZmlsbD0iI0ZGQTcyNiIvPjxyZWN0IHg9IjUwIiB5PSI0IiB3aWR0aD0iMzAiIGhlaWdodD0iNDgiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOCIvPjwvZz48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUsIDQ0KSI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NiAwQzEyNC4zNTIgMCAxMzAuMDAxIDQwLjY4NTQgMTMwIDc4QzEyOS45OTkgMTExLjMxNSAxMDQuNTM0IDEyMCA2NiAxMjBDMjguNTM4NyAxMjAgMCAxMTEuMzE1IDAgNzhDMCA0MC42ODU0IDcuNjQ4NDMgMCA2NiAwWiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC44Ii8+PG1hc2sgaWQ9ImZhY2VSb3VuZDAxTWFzazAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY2IDBDMTI0LjM1MiAwIDEzMC4wMDEgNDAuNjg1NCAxMzAgNzhDMTI5Ljk5OSAxMTEuMzE1IDEwNC41MzQgMTIwIDY2IDEyMEMyOC41Mzg3IDEyMCAwIDExMS4zMTUgMCA3OEMwIDQwLjY4NTQgNy42NDg0MyAwIDY2IDBaIiBmaWxsPSJ3aGl0ZSIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2ZhY2VSb3VuZDAxTWFzazApIj48cmVjdCB4PSItNCIgeT0iLTIiIHdpZHRoPSIxMzgiIGhlaWdodD0iMTI0IiBmaWxsPSIjRkI4QzAwIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAwSDExVjE4SDE1VjBaTTIzIDBIMTlWMzBWMzRIMjNINzIuNDE2QzczLjE4NzYgMzUuNzY1OSA3NC45NDk3IDM3IDc3IDM3Qzc5Ljc2MTQgMzcgODIgMzQuNzYxNCA4MiAzMkM4MiAyOS4yMzg2IDc5Ljc2MTQgMjcgNzcgMjdDNzQuOTQ5NyAyNyA3My4xODc2IDI4LjIzNDEgNzIuNDE2IDMwSDIzVjBaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjEiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyMiAzNC41ODRDMTIzLjc2NiAzMy44MTI0IDEyNSAzMi4wNTAzIDEyNSAzMEMxMjUgMjcuMjM4NiAxMjIuNzYxIDI1IDEyMCAyNUMxMTcuMjM5IDI1IDExNSAyNy4yMzg2IDExNSAzMEMxMTUgMzIuMDUwMyAxMTYuMjM0IDMzLjgxMjQgMTE4IDM0LjU4NFY2MFY2NEgxMjJIMTQxVjYwSDEyMlYzNC41ODRaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExNCA0NkgxMTBWNjhWNzJIMTE0SDE0MVY2OEgxMTRWNDZaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjIiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI3IDEwMy41ODRDMjUuMjM0MSAxMDIuODEyIDI0IDEwMS4wNSAyNCA5OUMyNCA5Ni4yMzg2IDI2LjIzODYgOTQgMjkgOTRDMzEuNzYxNCA5NCAzNCA5Ni4yMzg2IDM0IDk5QzM0IDEwMS4wNSAzMi43NjU5IDEwMi44MTIgMzEgMTAzLjU4NFYxMjlWMTMzSDI3SDhWMTI5SDI3VjEwMy41ODRaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L2c+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUyLCAxMjQpIj48cmVjdCB4PSI0IiB5PSI1IiB3aWR0aD0iNjgiIGhlaWdodD0iMjIiIHJ4PSI1IiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjIiLz48cmVjdCB4PSI4IiB5PSI5IiB3aWR0aD0iNjAiIGhlaWdodD0iMTQiIHJ4PSIyIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwIDE3TDI2IDlIMTRMMjAgMTdaIiBmaWxsPSIjRTFFNkU4Ii8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAxN0wzOCA5SDI2TDMyIDE3WiIgZmlsbD0iI0UxRTZFOCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDQgMTdMNTAgOUgzOEw0NCAxN1oiIGZpbGw9IiNFMUU2RTgiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTU2IDE3TDYyIDlINTBMNTYgMTdaIiBmaWxsPSIjRTFFNkU4Ii8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM4LCA3NikiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjUgMjcuMkwzMC41IDMyLjdDMzEgMzMuMSAzMS43IDMzLjEgMzIuMSAzMi43TDMzLjcgMzEuMUMzNC4xIDMwLjYgMzQuMSAyOS45IDMzLjcgMjkuNUwyOC4yIDI0TDMzLjcgMTguNUMzNC4xIDE4IDM0LjEgMTcuMyAzMy43IDE2LjlMMzIuMSAxNS4zQzMxLjYgMTQuOSAzMC45IDE0LjkgMzAuNSAxNS4zTDI1IDIwLjhMMTkuNSAxNS4zQzE5IDE0LjkgMTguMyAxNC45IDE3LjkgMTUuM0wxNi4zIDE2LjlDMTUuOSAxNy4zIDE1LjkgMTggMTYuMyAxOC41TDIxLjggMjRMMTYuMyAyOS41QzE1LjkgMzAgMTUuOSAzMC43IDE2LjMgMzEuMUwxNy45IDMyLjdDMTguNCAzMy4xIDE5LjEgMzMuMSAxOS41IDMyLjdMMjUgMjcuMloiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuOCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzkgMjcuMkw4NC41IDMyLjdDODUgMzMuMSA4NS43IDMzLjEgODYuMSAzMi43TDg3LjcgMzEuMUM4OC4xIDMwLjYgODguMSAyOS45IDg3LjcgMjkuNUw4Mi4yIDI0TDg3LjcgMTguNUM4OC4xIDE4IDg4LjEgMTcuMyA4Ny43IDE2LjlMODYuMSAxNS4zQzg1LjYgMTQuOSA4NC45IDE0LjkgODQuNSAxNS4zTDc5IDIwLjhMNzMuNSAxNS4zQzczIDE0LjkgNzIuMyAxNC45IDcxLjkgMTUuM0w3MC4zIDE2LjlDNjkuOSAxNy4zIDY5LjkgMTggNzAuMyAxOC41TDc1LjggMjRMNzAuMyAyOS41QzY5LjkgMzAgNjkuOSAzMC43IDcwLjMgMzEuMUw3MS45IDMyLjdDNzIuNCAzMy4xIDczLjEgMzMuMSA3My41IDMyLjdMNzkgMjcuMloiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuOCIvPjwvZz48L3N2Zz4=',
          name: 'علی علی بیگی ',
          orders: [
            {
              pk: 7,
              product: 72,
              count: 1,
              original_price: 74000,
              bill: { pk: 7, table: { pk: 10, number: '3333' } },
              private_id: '59f0b213-1e0f-4772-a323-ddbe1f3be678',
              discount: 0,
              is_staff: false,
              unit_amount: 74000,
              my_payments: { payed_amount: 0, refund_amount: 0, net_amount: 0 },
              pickup_time: '2020-12-06T02:59:44.545298Z',
              sent_to_kitchen: false,
              datetime: '2020-12-06T02:59:44.549175Z',
              invoices: [],
              product_data: {
                pk: 72,
                name: 'پیتزا مخصوص (آمریکایی)',
                order: 0,
              },
              is_accepted: false,
              payment_info: {
                total_count: 1,
                total_amount: 74000,
                payed_amount: 0,
                payed_amount_pos: 0,
                payed_amount_cash: 0,
                payed_amount_online: 0,
                refund_amount: 0,
                net_payed_amount: 0,
                net_amount: 74000,
              },
              wish_to_pay: 74000,
              name: 'پیتزا مخصوص (آمریکایی)',
            },
            {
              pk: 8,
              product: 73,
              count: 1,
              original_price: 55000,
              bill: { pk: 7, table: { pk: 10, number: '3333' } },
              private_id: '64ca9599-4712-4652-b980-2777f064a013',
              discount: 0,
              is_staff: false,
              unit_amount: 55000,
              my_payments: { payed_amount: 0, refund_amount: 0, net_amount: 0 },
              pickup_time: '2020-12-06T02:59:44.605904Z',
              sent_to_kitchen: false,
              datetime: '2020-12-06T02:59:44.608618Z',
              invoices: [],
              product_data: {
                pk: 73,
                name: 'پیتزا پپرونی (آمریکایی)',
                order: 1,
              },
              is_accepted: false,
              payment_info: {
                total_count: 1,
                total_amount: 55000,
                payed_amount: 0,
                payed_amount_pos: 0,
                payed_amount_cash: 0,
                payed_amount_online: 0,
                refund_amount: 0,
                net_payed_amount: 0,
                net_amount: 55000,
              },
              wish_to_pay: 55000,
              name: 'پیتزا پپرونی (آمریکایی)',
            },
          ],
          id: 4,
        },
      ],
      payment: {
        total_count: 2,
        total_amount: 129000,
        payed_amount: 0,
        payed_amount_pos: 0,
        payed_amount_cash: 0,
        payed_amount_online: 0,
        refund_amount: 0,
        net_payed_amount: 0,
        net_amount: 129000,
      },
      yourOrdersCost: 0,
      yourOrdersPaid: 0,
      you: { orders: [] },
      },
    }
  },
  computed: {},
  beforeMount() {
    //  this.dispatch('table/preorderConnection', this.$route.params.id)
  },
  mounted() {
    let animationData
    switch (this.status) {
      case 0:
        animationData = waiting
        this.statusText = 'در انتظار تایید توسط پذیرنده'
        break
      case 1:
        animationData = this.preparingFood
        this.statusText = 'در حال آماده‌سازی سفارش شما'
        break
      case 2:
        this.statusText = '!سفارش شما آماده است'
        animationData = this.foodReady
        break
      case 3:
        animationData = this.declined
        this.statusText = 'سفارش شما توسط پذیرنده رد شد'
        break

      default:
        break
    }
    setTimeout(() => {
      let preloader = lottie.loadAnimation({
        container: document.getElementById('animation-order-status'), // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData, // the path to the animation json
      })
      preloader.play()
    }, 200)
  },
}
</script>

<style scoped>
</style>