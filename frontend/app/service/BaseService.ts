import { AxiosRequestConfig } from "axios";
import { apiClient, getAccessToken } from "./apiClient";

type RequestPayload = Record<string, unknown>;

export class BaseService {
  private getAuthConfig(): AxiosRequestConfig {
    const token = getAccessToken();

    if (!token) {
      return {};
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  // auth service
  login(formData: RequestPayload) {
    return apiClient.post("/auth/signin", formData);
  }

  getUser() {
    return apiClient.get("/users/me", this.getAuthConfig());
  }

  // order service
  getOrderById(orderId: string) {
    return apiClient.get(`/order/order/${orderId}`, this.getAuthConfig());
  }

  createOrder(formData: RequestPayload) {
    return apiClient.post("/order/add-order", formData, this.getAuthConfig());
  }

  // point service
  getPointInProvinceById(orderId: string) {
    return apiClient.get(`/order/order/${orderId}`, this.getAuthConfig());
  }

  getTransByProvinceId(proviceId: string) {
    return apiClient.get(`/trans/province/${proviceId}`, this.getAuthConfig());
  }

  getHubsByProvinceId(proviceId: string) {
    return apiClient.get(`/hub/province/${proviceId}`, this.getAuthConfig());
  }

  createTrans(formData: RequestPayload) {
    return apiClient.post("/trans/add-trans", formData, this.getAuthConfig());
  }

  createHub(formData: RequestPayload) {
    return apiClient.post("/hub/add-hub", formData, this.getAuthConfig());
  }

  getTransById(transId: string) {
    return apiClient.get(`/trans/trans/${transId}`, this.getAuthConfig());
  }

  getHubsById(hubId: string) {
    return apiClient.get(`/hub/hub/${hubId}`, this.getAuthConfig());
  }

  getUserOnPoint(pointId: string) {
    return apiClient.get(`/users/user-on-point/${pointId}`, this.getAuthConfig());
  }

  addUserOnPoint(formData: RequestPayload) {
    return apiClient.post("/users/add-auth", formData, this.getAuthConfig());
  }

  getAllUser(formData: RequestPayload) {
    return apiClient.post("/users/get-all-users", formData, this.getAuthConfig());
  }

  createUser(formData: RequestPayload) {
    return apiClient.post("/users/create-user", formData, this.getAuthConfig());
  }

  getAllOrder(formData: RequestPayload) {
    return apiClient.post("/order/order", formData, this.getAuthConfig());
  }

  findOrderOnPoint(formData: RequestPayload) {
    return apiClient.post(
      "/order/find-order-on-trans-hub",
      formData,
      this.getAuthConfig(),
    );
  }

  findOrderWaitOnTrans(formData: RequestPayload) {
    return apiClient.post(
      "/order/find-order-wait-on-trans",
      formData,
      this.getAuthConfig(),
    );
  }

  findOrderMoveInPoint(formData: RequestPayload) {
    return apiClient.post(
      "/order/find-order-from-trans-hub",
      formData,
      this.getAuthConfig(),
    );
  }

  findOrderMoveOutPoint(formData: RequestPayload) {
    return apiClient.post(
      "/order/find-order-moving-trans-hub",
      formData,
      this.getAuthConfig(),
    );
  }

  findOrderSuccessFailReturn(formData: RequestPayload) {
    return apiClient.post(
      "/order/find-order-success-fail-return",
      formData,
      this.getAuthConfig(),
    );
  }

  confirmOrderOnTrans(formData: RequestPayload) {
    return apiClient.post(
      "/order/confirm-order-on-trans",
      formData,
      this.getAuthConfig(),
    );
  }

  confirmOrderFromTrans(formData: RequestPayload) {
    return apiClient.post(
      "/order/confirm-order-from-trans",
      formData,
      this.getAuthConfig(),
    );
  }

  confirmOrderOnHub(formData: RequestPayload) {
    return apiClient.post(
      "/order/confirm-order-on-hub",
      formData,
      this.getAuthConfig(),
    );
  }

  confirmOrderFromHub(formData: RequestPayload) {
    return apiClient.post(
      "/order/confirm-order-from-hub",
      formData,
      this.getAuthConfig(),
    );
  }

  confirmOrderSuccessFail(formData: RequestPayload) {
    return apiClient.post(
      "/order/confirm-order-success-fail",
      formData,
      this.getAuthConfig(),
    );
  }

  confirmOrderFailOnTrans(formData: RequestPayload) {
    return apiClient.post(
      "/order/confirm-order-fail-on-trans",
      formData,
      this.getAuthConfig(),
    );
  }
}
