<template>
  <div class="modal-container">
    <div id="payment-widget" />
    <div id="agreement" />
    <button id="payment-button" @click="handlePaymentRequest">결제하기</button>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'vuex';
export default {
  props: {
    templateDesc: {
      type: Object,
    },
  },
  setup({ templateDesc }) {
    const paymentWidget = ref(null);
    const customerKey = uuidv4();
    const paymentMethodsWidgetRef = ref(null);
    const price = ref(templateDesc.price);
    const store = useStore();
    const user = computed(() => store.state.user);

    const fetchPaymentWidget = async () => {
      //price.value = Number(price.value.toLocaleString().replace(/,/, '_'));

      try {
        const loadedWidget = await loadPaymentWidget(
          process.env.CLIENT_KEY,
          customerKey,
        );
        paymentWidget.value = loadedWidget;
      } catch (err) {
        console.error('Error fetching payment widget:', err);
      }
    };

    fetchPaymentWidget();

    const paymentUiRender = paymentWidget => {
      if (paymentWidget === null) {
        return;
      }
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        { value: price.value },
        { variantKey: 'DEFAULT' },
      );

      paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });

      paymentMethodsWidgetRef.value = paymentMethodsWidget;
    };

    paymentUiRender(paymentWidget.value);

    watch(paymentWidget, paymentWidget => {
      paymentUiRender(paymentWidget);
    });

    const handlePaymentRequest = async () => {
      try {
        await paymentWidget.value.requestPayment({
          orderId: uuidv4(),
          orderName: templateDesc.title,
          customerName: user.value.name,
          customerEmail: user.value.email,
          customerMobilePhone:
            user.value.phoneNumber === ''
              ? '01012345678'
              : user.value.phoneNumber,
          successUrl: `${window.location.origin}/success/${templateDesc.templateId}`,
          failUrl: `${window.location.origin}/fail`,
          _skipAuth: 'FORCE_SUCCESS',
        });
      } catch (error) {
        console.error('Error requesting payment:', error);
      }
    };

    return {
      handlePaymentRequest,
    };
  },
};
</script>

<style>
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
