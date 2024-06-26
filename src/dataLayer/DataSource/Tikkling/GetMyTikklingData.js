import {apiModel} from '../../APIModel/ApiModel';
import {getToken} from '../../APIModel/GetToken';
import {resetToken} from '../../APIModel/ResetToken';

export async function getMyTikklingData() {
  //------ get token ------------------------------------------------------//
  let authorization = null;

  try {
    authorization = await getToken();
    if (!authorization) {
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 3,
      DSdata: null,
      DSmessage: '로그인이 만료 되었어요. 다시 로그인해주세요.',
    };
  }

  //------ collect data ---------------------------------------------------//
  /** if there is some data control for company that will be added here **/

  //------ call get_user_checkTikkling -------------------------------------------------------//
  let response;

  try {
    response = await apiModel(
      'get_user_checkTikkling',
      authorization,
      null,
      null,
    );
    if (!response) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //console.log(response);

  //------ control result & error of get_user_checkTikkling-----------------------------------------//

  if (response.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  // check is Tikkling
  if (response.data.detail_code === '11') {
    return {
      DScode: 0,
      DSdata: {is_tikkling: false},
      DSmessage: '진행중인 티클링이 없어요.',
    };
  } else if (response.data.detail_code !== '10') {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //------ call get_tikkling_info -------------------------------------------------------//
  let response2;

  try {
    response2 = await apiModel('get_tikkling_info', authorization, null, '0');

    if (!response2) {
      //  error
      throw new Error();
    }
  } catch (error) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //console.log('data : ', response2.data.data[0]);

  //------ control result & error of get_tikkling_info -----------------------------------------//

  if (response2.status === 400) {
    // input data error
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  } else if (response2.status === 404) {
    return {
      DScode: 0,
      DSdata: {is_tikkling: false},
      DSmessage: '진행중인 티클링이 없어요.',
    };
  } else if (response2.status !== 200) {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  //check detail_code
  if (response2.data.detail_code !== '01') {
    return {
      DScode: 2,
      DSdata: null,
      DSmessage: '요청을 처리하는 동안 문제가 발생했어요. 다시 시도해주세요.',
    };
  }

  const info = response2.data.data;
  if (info === null) {
    info = [];
  }

  //------ update token ---------------------------------------------------//

  if (response2.data.returnToken) {
    const response_setToken = await resetToken(
      response2.data.returnToken,
      authorization,
    );
  }

  //------ return response ------------------------------------------------//

  return {
    DScode: 0,
    DSdata: {is_tikkling: true, info: info},
    DSmessage: '티클링이 진행중이에요.',
  };
}
