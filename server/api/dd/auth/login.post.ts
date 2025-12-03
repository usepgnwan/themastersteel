import { useApi } from "~/composables/useAPI.server";
import CryptoJS from 'crypto-js'

export default defineEventHandler(async event => {
  const api = useApi();
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const decrypted = CryptoJS.AES.decrypt(body.data, config.public.secretForm).toString(CryptoJS.enc.Utf8);

  const formdata = JSON.parse(decrypted);

  const { data, error, status } = await api.post('user/login', {
    body: formdata,
    type: 'main'
  });

  setResponseStatus(event, status);

  return { data, error, status };
});
