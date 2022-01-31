export const VEC_DICT = [
    '북',
    '북북동',
    '북동',
    '동북동',
    '동풍',
    '동남동',
    '남동',
    '남남동',
    '남',
    '남남서',
    '남서',
    '서남서',
    '서',
    '서북서',
    '북서',
    '북북서',
    '북',
]

export const SKY_DICT = {
    1: '맑음',
    3: '구름많음',
    4: '흐림',
}
export const PTY_DICT = {
    0: '없음',
    1: '비',
    2: '비/눈',
    3: '눈',
    4: '소나기',
}

export const dummyData = {
    response: {
        header: {
            resultCode: '00',
            resultMsg: 'NORMAL_SERVICE',
        },
        body: {
            dataType: 'JSON',
            items: {
                item: [
                    {
                        baseDate: '20220126',
                        baseTime: '0600',
                        category: 'PTY',
                        nx: 55,
                        ny: 127,
                        obsrValue: '0',
                    },
                    {
                        baseDate: '20220126',
                        baseTime: '0600',
                        category: 'REH',
                        nx: 55,
                        ny: 127,
                        obsrValue: '90',
                    },
                    {
                        baseDate: '20220126',
                        baseTime: '0600',
                        category: 'RN1',
                        nx: 55,
                        ny: 127,
                        obsrValue: '0',
                    },
                    {
                        baseDate: '20220126',
                        baseTime: '0600',
                        category: 'T1H',
                        nx: 55,
                        ny: 127,
                        obsrValue: '-3.2',
                    },
                    {
                        baseDate: '20220126',
                        baseTime: '0600',
                        category: 'UUU',
                        nx: 55,
                        ny: 127,
                        obsrValue: '-1.2',
                    },
                    {
                        baseDate: '20220126',
                        baseTime: '0600',
                        category: 'VEC',
                        nx: 55,
                        ny: 127,
                        obsrValue: '99',
                    },
                    {
                        baseDate: '20220126',
                        baseTime: '0600',
                        category: 'VVV',
                        nx: 55,
                        ny: 127,
                        obsrValue: '0.2',
                    },
                    {
                        baseDate: '20220126',
                        baseTime: '0600',
                        category: 'WSD',
                        nx: 55,
                        ny: 127,
                        obsrValue: '1.3',
                    },
                ],
            },
            pageNo: 1,
            numOfRows: 1000,
            totalCount: 8,
        },
    },
}
