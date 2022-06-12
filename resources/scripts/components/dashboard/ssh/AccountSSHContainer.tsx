import React, { useEffect } from 'react';
import ContentBox from '@/components/elements/ContentBox';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import FlashMessageRender from '@/components/FlashMessageRender';
import PageContentBlock from '@/components/elements/PageContentBlock';
import tw from 'twin.macro';
import GreyRowBox from '@/components/elements/GreyRowBox';
import { useSSHKeys } from '@/api/account/ssh-keys';
import { useFlashKey } from '@/plugins/useFlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import CreateSSHKeyForm from '@/components/dashboard/ssh/CreateSSHKeyForm';
import DeleteSSHKeyButton from '@/components/dashboard/ssh/DeleteSSHKeyButton';

export default () => {
    const { clearAndAddHttpError } = useFlashKey('account');
    const { data, isValidating, error } = useSSHKeys({
        revalidateOnMount: true,
        revalidateOnFocus: false,
    });

    useEffect(() => {
        clearAndAddHttpError(error);
    }, [ error ]);

    return (
        <PageContentBlock title={'账户 API'}>
            <FlashMessageRender byKey={'account'}/>
            <div css={tw`md:flex flex-nowrap my-10`}>
                <ContentBox title={'添加 SSH 密钥'} css={tw`flex-none w-full md:w-1/2`}>
                    <CreateSSHKeyForm/>
                </ContentBox>
                <ContentBox title={'SSH 密钥'} css={tw`flex-1 overflow-hidden mt-8 md:mt-0 md:ml-8`}>
                    <SpinnerOverlay visible={!data && isValidating}/>
                    {
                        !data || !data.length ?
                            <p css={tw`text-center text-sm`}>
                                {!data ? '加载中...' : '此账户下无可用 SSH 密钥.'}
                            </p>
                            :
                            data.map((key, index) => (
                                <GreyRowBox
                                    key={key.fingerprint}
                                    css={[ tw`bg-neutral-600 flex space-x-4 items-center`, index > 0 && tw`mt-2` ]}
                                >
                                    <FontAwesomeIcon icon={faKey} css={tw`text-neutral-300`}/>
                                    <div css={tw`flex-1`}>
                                        <p css={tw`text-sm break-words font-medium`}>{key.name}</p>
                                        <p css={tw`text-xs mt-1 font-mono truncate`}>
                                            SHA256:{key.fingerprint}
                                        </p>
                                        <p css={tw`text-xs mt-1 text-neutral-300 uppercase`}>
                                            Added on:&nbsp;
                                            {format(key.createdAt, 'MMM do, yyyy HH:mm')}
                                        </p>
                                    </div>
                                    <DeleteSSHKeyButton fingerprint={key.fingerprint} />
                                </GreyRowBox>
                            ))
                    }
                </ContentBox>
            </div>
        </PageContentBlock>
    );
};
